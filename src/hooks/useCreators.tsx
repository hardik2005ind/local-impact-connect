
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useCreators = (filters?: {
  city?: string;
  niche?: string;
  minFollowers?: number;
  maxFollowers?: number;
}) => {
  return useQuery({
    queryKey: ['creators', filters],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('get-creators', {
        body: filters
      });

      if (error) throw error;
      return data.creators;
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
        .eq('is_verified', true)
        .single();

      if (error) throw error;
      return data;
    }
  });
};
