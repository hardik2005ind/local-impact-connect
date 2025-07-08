
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useCampaigns = (filters?: {
  city?: string;
  niche?: string;
  status?: string;
}) => {
  return useQuery({
    queryKey: ['campaigns', filters],
    queryFn: async () => {
      let query = supabase
        .from('campaigns')
        .select(`
          *,
          brands:brand_id (
            brand_name,
            logo_url
          )
        `)
        .eq('status', 'active');

      if (filters?.city) {
        query = query.eq('target_city', filters.city);
      }
      
      if (filters?.niche) {
        query = query.eq('target_niche', filters.niche);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });
};

export const useBrandCampaigns = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['brand-campaigns', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('brand_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });
};

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (campaignData: any) => {
      const { data, error } = await supabase
        .from('campaigns')
        .insert(campaignData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['brand-campaigns'] });
    }
  });
};

export const useApplyCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ campaignId, applicationMessage }: { campaignId: string, applicationMessage: string }) => {
      const { data, error } = await supabase
        .from('campaign_applications')
        .insert({
          campaign_id: campaignId,
          creator_id: (await supabase.auth.getUser()).data.user?.id,
          application_message: applicationMessage
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-applications'] });
    }
  });
};

export const useMyApplications = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['my-applications', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('campaign_applications')
        .select(`
          *,
          campaigns:campaign_id (
            title,
            brands:brand_id (
              brand_name
            )
          )
        `)
        .eq('creator_id', user.id)
        .order('applied_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });
};

export const useCampaignDetails = (campaignId: string) => {
  return useQuery({
    queryKey: ['campaign-details', campaignId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select(`
          *,
          brands:brand_id (
            brand_name,
            logo_url,
            business_contact,
            instagram_handle,
            website
          )
        `)
        .eq('id', campaignId)
        .single();
      
      if (error) throw error;
      return data;
    }
  });
};
