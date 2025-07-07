
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useCreatorRequests = () => {
  return useQuery({
    queryKey: ['creator-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('creator_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });
};

export const useBrandRequests = () => {
  return useQuery({
    queryKey: ['brand-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brand_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });
};

export const useApproveCreator = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ requestId, action, enrichmentData }: {
      requestId: string;
      action: 'approve' | 'reject';
      enrichmentData?: any;
    }) => {
      const { data, error } = await supabase.functions.invoke('admin-approve-creator', {
        body: { requestId, action, enrichmentData }
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creator-requests'] });
    }
  });
};

export const useApproveBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ requestId, action, notes }: {
      requestId: string;
      action: 'approve' | 'reject';
      notes?: string;
    }) => {
      const { data, error } = await supabase.functions.invoke('admin-approve-brand', {
        body: { requestId, action, notes }
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brand-requests'] });
    }
  });
};
