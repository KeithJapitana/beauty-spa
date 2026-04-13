interface InquiryData {
  name: string
  email: string
  phone?: string | null
  service_interested?: string | null
  message: string
}

/** Email sent to the spa owner when a new inquiry arrives */
export function ownerNotificationHtml(data: InquiryData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>New Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#f7f7f7;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#ff385c;padding:32px 40px;">
              <p style="margin:0;color:#ffffff;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Lumière Beauty Spa</p>
              <h1 style="margin:8px 0 0;color:#ffffff;font-size:24px;font-weight:700;">New Inquiry Received</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 24px;color:#666;font-size:15px;line-height:1.6;">
                You have a new consultation inquiry. Here are the details:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0f0f0;border-radius:12px;overflow:hidden;">
                ${row('Name', data.name)}
                ${row('Email', `<a href="mailto:${data.email}" style="color:#ff385c;">${data.email}</a>`)}
                ${data.phone ? row('Phone', `<a href="tel:${data.phone}" style="color:#ff385c;">${data.phone}</a>`) : ''}
                ${data.service_interested ? row('Service Interested', data.service_interested) : ''}
                ${row('Message', data.message.replace(/\n/g, '<br/>'), true)}
              </table>

              <div style="margin-top:32px;text-align:center;">
                <a href="mailto:${data.email}" style="display:inline-block;background:#ff385c;color:#ffffff;font-size:14px;font-weight:600;padding:14px 32px;border-radius:8px;text-decoration:none;">
                  Reply to ${data.name}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f7f7f7;padding:24px 40px;text-align:center;">
              <p style="margin:0;color:#aaa;font-size:12px;">
                This notification was sent from your Lumière Beauty Spa website contact form.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

/** Confirmation email sent to the client */
export function clientConfirmationHtml(name: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>We received your inquiry</title>
</head>
<body style="margin:0;padding:0;background:#f7f7f7;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#ff385c;padding:32px 40px;text-align:center;">
              <p style="margin:0;color:#ffffff;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Lumière Beauty Spa</p>
              <h1 style="margin:8px 0 0;color:#ffffff;font-size:24px;font-weight:700;">We Got Your Message ✦</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 16px;color:#222222;font-size:16px;font-weight:600;">
                Hi ${name},
              </p>
              <p style="margin:0 0 16px;color:#666;font-size:15px;line-height:1.7;">
                Thank you for reaching out to Lumière Beauty Spa. We've received your inquiry and a real person from our team will get back to you personally within <strong style="color:#222222;">2–4 hours</strong> during business hours.
              </p>
              <p style="margin:0 0 32px;color:#666;font-size:15px;line-height:1.7;">
                No bots, no auto-replies — just genuine care from our team.
              </p>

              <!-- Info box -->
              <div style="background:#fff8f9;border:1px solid #ffd6dd;border-radius:12px;padding:24px;margin-bottom:32px;">
                <p style="margin:0 0 8px;color:#ff385c;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Our Hours</p>
                <p style="margin:0;color:#444;font-size:14px;line-height:1.6;">
                  Monday – Saturday: 9:00 AM – 8:00 PM<br/>
                  Sunday: Closed<br/>
                  📍 Rizal St, Silay, 6116 Negros Occidental
                </p>
              </div>

              <div style="text-align:center;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/services" style="display:inline-block;background:#ff385c;color:#ffffff;font-size:14px;font-weight:600;padding:14px 32px;border-radius:8px;text-decoration:none;">
                  Explore Our Services
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f7f7f7;padding:24px 40px;text-align:center;">
              <p style="margin:0;color:#aaa;font-size:12px;">
                Lumière Beauty Spa · Rizal St, Silay, 6116 Negros Occidental<br/>
                <a href="mailto:keithjapitana@gmail.com" style="color:#ff385c;text-decoration:none;">keithjapitana@gmail.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

function row(label: string, value: string, isLast = false): string {
  return `
    <tr>
      <td style="padding:14px 20px;background:#fafafa;border-bottom:${isLast ? 'none' : '1px solid #f0f0f0'};width:35%;vertical-align:top;">
        <span style="font-size:12px;font-weight:600;color:#999;text-transform:uppercase;letter-spacing:0.5px;">${label}</span>
      </td>
      <td style="padding:14px 20px;border-bottom:${isLast ? 'none' : '1px solid #f0f0f0'};vertical-align:top;">
        <span style="font-size:14px;color:#222222;">${value}</span>
      </td>
    </tr>
  `
}
