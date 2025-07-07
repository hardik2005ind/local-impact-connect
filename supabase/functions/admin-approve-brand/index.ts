
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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabaseClient.auth.getUser(token)

    if (!user) throw new Error('Unauthorized')

    // Check if user is admin
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') throw new Error('Admin access required')

    const { requestId, action, notes } = await req.json()

    if (action === 'approve') {
      // Get brand request
      const { data: request } = await supabaseClient
        .from('brand_requests')
        .select('*')
        .eq('id', requestId)
        .single()

      if (!request) throw new Error('Request not found')

      // Create brand profile
      const { error: brandError } = await supabaseClient
        .from('brands')
        .insert({
          id: request.user_id,
          brand_name: request.brand_name,
          business_contact: request.business_contact,
          business_niche: request.business_niche,
          instagram_handle: request.instagram_handle,
          website: request.website,
          is_verified: true
        })

      if (brandError) throw brandError

      // Update request status
      await supabaseClient
        .from('brand_requests')
        .update({ status: 'accepted', admin_notes: notes })
        .eq('id', requestId)

    } else if (action === 'reject') {
      await supabaseClient
        .from('brand_requests')
        .update({ status: 'rejected', admin_notes: notes })
        .eq('id', requestId)
    }

    return new Response(
      JSON.stringify({ message: `Brand request ${action}d successfully` }),
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
