
import { useQuery } from '@tanstack/react-query';

export const useCreators = (filters?: {
  city?: string;
  niche?: string;
  minFollowers?: number;
  maxFollowers?: number;
}) => {
  return useQuery({
    queryKey: ['creators', filters],
    queryFn: async () => {
      // Return mock data for now since database tables don't exist yet
      return [];
    }
  });
};

export const useCreatorProfile = (creatorId: string) => {
  return useQuery({
    queryKey: ['creator', creatorId],
    queryFn: async () => {
      // Return mock data for now since database tables don't exist yet
      return null;
    }
  });
};
