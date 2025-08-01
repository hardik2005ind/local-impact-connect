
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

    const url = new URL(req.url)
    const city = url.searchParams.get('city')
    const niche = url.searchParams.get('niche')
    const minFollowers = url.searchParams.get('minFollowers')
    const maxFollowers = url.searchParams.get('maxFollowers')

    let query = supabaseClient
      .from('creators')
      .select('*')
      .eq('is_verified', true)

    if (city) {
      query = query.ilike('city', `%${city}%`)
    }

    if (niche) {
      query = query.eq('content_niche', niche)
    }

    if (minFollowers) {
      query = query.gte('follower_count', parseInt(minFollowers))
    }

    if (maxFollowers) {
      query = query.lte('follower_count', parseInt(maxFollowers))
    }

    const { data: creators, error } = await query.order('follower_count', { ascending: false })

    if (error) throw error

    return new Response(
      JSON.stringify({ creators }),
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
