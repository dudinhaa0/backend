import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qxbhoxcqozyfwscylmvt.supabase.co'
const supabaseAnonKey = 'sb_publishable_ZCUu5Xq3rvMWQQ3U3dFq-A_pC0UARHV'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)