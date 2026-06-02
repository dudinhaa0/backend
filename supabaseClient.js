const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qxbhoxcqozyfwscylmvt.supabase.co'
const supabaseKey = 'sb_publishable_ZCUu5Xq3rvMWQQ3U3dFq-A_pC0UARHV'
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;