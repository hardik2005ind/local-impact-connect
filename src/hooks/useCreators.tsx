
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useCreators = (filters?: {
  city?: string;
  niche?: string;
  minFollowers?: number;
  maxFollowers?: number;
}) => {
  return useQuery({
    queryKey: ['creators', filters],
    queryFn: async () => {
      let query = supabase
        .from('creators')
        .select('*')
        .eq('is_verified', true);

      if (filters?.city) {
        query = query.eq('city', filters.city);
      }
      
      if (filters?.niche) {
        query = query.eq('content_niche', filters.niche);
      }

      if (filters?.minFollowers) {
        query = query.gte('follower_count', filters.minFollowers);
      }

      if (filters?.maxFollowers) {
        query = query.lte('follower_count', filters.maxFollowers);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });
};

export const useCreatorProfile = (creatorId: string) => {
  return useQuery({
    queryKey: ['creator', creatorId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', creatorId)
        .single();
      
      if (error) throw error;
      return data;
    }
  });
};

export const useUpdateCreatorProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData: any) => {
      const { data, error } = await supabase
        .from('creators')
        .update(profileData)
        .eq('id', profileData.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creators'] });
    }
  });
};
