
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabaseClient.auth.getUser(token)

    if (!user) throw new Error('Unauthorized')

    // Check if user is a verified creator
    const { data: creator } = await supabaseClient
      .from('creators')
      .select('id')
      .eq('id', user.id)
      .eq('is_verified', true)
      .single()

    if (!creator) throw new Error('Creator verification required')

    const { campaignId, applicationMessage } = await req.json()

    // Check if already applied
    const { data: existingApplication } = await supabaseClient
      .from('campaign_applications')
      .select('id')
      .eq('campaign_id', campaignId)
      .eq('creator_id', user.id)
      .single()

    if (existingApplication) {
      throw new Error('Already applied to this campaign')
    }

    const { data: application, error } = await supabaseClient
      .from('campaign_applications')
      .insert({
        campaign_id: campaignId,
        creator_id: user.id,
        application_message: applicationMessage,
        status: 'pending'
      })
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({ application, message: 'Application submitted successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
