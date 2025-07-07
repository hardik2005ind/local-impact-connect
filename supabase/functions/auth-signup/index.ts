
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
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const { email, password, role, userData } = await req.json()

    // Create user account
    const { data: authData, error: authError } = await supabaseClient.auth.signUp({
      email,
      password,
    })

    if (authError) throw authError

    if (!authData.user) throw new Error('User creation failed')

    // Create profile
    const { error: profileError } = await supabaseClient
      .from('profiles')
      .insert({
        id: authData.user.id,
        email,
        role
      })

    if (profileError) throw profileError

    // Create role-specific request
    if (role === 'creator') {
      const { error: creatorError } = await supabaseClient
        .from('creator_requests')
        .insert({
          user_id: authData.user.id,
          name: userData.name,
          email,
          instagram_handle: userData.instagram_handle,
          mobile_number: userData.mobile_number,
          content_niche: userData.content_niche,
          city: userData.city,
          state: userData.state
        })

      if (creatorError) throw creatorError
    } else if (role === 'brand') {
      const { error: brandError } = await supabaseClient
        .from('brand_requests')
        .insert({
          user_id: authData.user.id,
          brand_name: userData.brand_name,
          email,
          business_contact: userData.business_contact,
          business_niche: userData.business_niche,
          instagram_handle: userData.instagram_handle,
          website: userData.website
        })

      if (brandError) throw brandError
    }

    return new Response(
      JSON.stringify({ message: 'Registration successful. Please wait for admin approval.' }),
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
