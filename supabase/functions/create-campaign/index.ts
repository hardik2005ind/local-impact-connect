
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

    // Check if user is a verified brand
    const { data: brand } = await supabaseClient
      .from('brands')
      .select('id')
      .eq('id', user.id)
      .eq('is_verified', true)
      .single()

    if (!brand) throw new Error('Brand verification required')

    const campaignData = await req.json()

    const { data: campaign, error } = await supabaseClient
      .from('campaigns')
      .insert({
        brand_id: user.id,
        title: campaignData.title,
        description: campaignData.description,
        reward_type: campaignData.reward_type,
        reward_details: campaignData.reward_details,
        target_city: campaignData.target_city,
        target_niche: campaignData.target_niche,
        deliverables: campaignData.deliverables,
        hashtags: campaignData.hashtags,
        deadline: campaignData.deadline,
        status: 'active',
        max_applicants: campaignData.max_applicants
      })
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({ campaign, message: 'Campaign created successfully' }),
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
