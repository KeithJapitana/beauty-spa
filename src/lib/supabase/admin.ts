import { createClient as createSupabaseClient } from '@supabase/supabase-js'

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    return null
  }

  return createSupabaseClient(url, key)
}

export const supabaseAdmin = getAdminClient()

export function createClient() {
  return supabaseAdmin
}
