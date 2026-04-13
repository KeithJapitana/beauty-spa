import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/admin'
import { Resend } from 'resend'
import { ownerNotificationHtml, clientConfirmationHtml } from '@/lib/email/templates'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return true // skip verification if not configured

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${token}`,
  })
  const data = await res.json()
  // Require score >= 0.5 (0 = bot, 1 = human)
  return data.success && data.score >= 0.5
}

export async function POST(req: NextRequest) {
  const supabase = createClient()
  if (!supabase) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
  }

  const body = await req.json()
  const { name, email, phone, service_interested, message, recaptcha_token } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
  }

  // reCAPTCHA verification
  if (recaptcha_token) {
    const isHuman = await verifyRecaptcha(recaptcha_token)
    if (!isHuman) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed. Please try again.' }, { status: 400 })
    }
  }

  // Save to Supabase
  const { error } = await supabase.from('inquiries').insert({
    name,
    email,
    phone: phone || null,
    service_interested: service_interested || null,
    message,
    status: 'new',
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Send emails via Resend (non-blocking — don't fail the request if email fails)
  if (resend) {
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
    const toEmail = process.env.RESEND_TO_EMAIL || 'keithjapitana@gmail.com'

    await Promise.allSettled([
      // Notify the spa owner
      resend.emails.send({
        from: `Lumière Beauty Spa <${fromEmail}>`,
        to: toEmail,
        subject: `New Inquiry from ${name}`,
        html: ownerNotificationHtml({ name, email, phone, service_interested, message }),
      }),
      // Confirm receipt to the client
      resend.emails.send({
        from: `Lumière Beauty Spa <${fromEmail}>`,
        to: email,
        subject: "We received your inquiry — we'll be in touch soon ✦",
        html: clientConfirmationHtml(name),
      }),
    ])
  }

  return NextResponse.json({ success: true })
}
