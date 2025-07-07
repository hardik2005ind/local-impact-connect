
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

    const { requestId, action, enrichmentData } = await req.json()

    if (action === 'approve') {
      // Get creator request
      const { data: request } = await supabaseClient
        .from('creator_requests')
        .select('*')
        .eq('id', requestId)
        .single()

      if (!request) throw new Error('Request not found')

      // Create creator profile
      const { error: creatorError } = await supabaseClient
        .from('creators')
        .insert({
          id: request.user_id,
          name: request.name,
          instagram_handle: request.instagram_handle,
          mobile_number: request.mobile_number,
          content_niche: request.content_niche,
          city: request.city,
          state: request.state,
          follower_count: enrichmentData.follower_count || 0,
          avg_likes: enrichmentData.avg_likes || 0,
          avg_comments: enrichmentData.avg_comments || 0,
          engagement_rate: enrichmentData.engagement_rate || 0,
          portfolio_links: enrichmentData.portfolio_links || [],
          is_verified: true
        })

      if (creatorError) throw creatorError

      // Update request status
      await supabaseClient
        .from('creator_requests')
        .update({ status: 'accepted', admin_notes: enrichmentData.notes })
        .eq('id', requestId)

    } else if (action === 'reject') {
      await supabaseClient
        .from('creator_requests')
        .update({ status: 'rejected', admin_notes: enrichmentData?.notes })
        .eq('id', requestId)
    }

    return new Response(
      JSON.stringify({ message: `Creator request ${action}d successfully` }),
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
