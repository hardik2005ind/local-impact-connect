export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      brand_requests: {
        Row: {
          admin_notes: string | null
          brand_name: string
          business_contact: string | null
          business_niche: string | null
          created_at: string | null
          email: string
          id: string
          instagram_handle: string | null
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string | null
          user_id: string
          website: string | null
        }
        Insert: {
          admin_notes?: string | null
          brand_name: string
          business_contact?: string | null
          business_niche?: string | null
          created_at?: string | null
          email: string
          id?: string
          instagram_handle?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          user_id: string
          website?: string | null
        }
        Update: {
          admin_notes?: string | null
          brand_name?: string
          business_contact?: string | null
          business_niche?: string | null
          created_at?: string | null
          email?: string
          id?: string
          instagram_handle?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      brands: {
        Row: {
          about: string | null
          brand_name: string
          business_contact: string | null
          business_niche: string | null
          created_at: string | null
          id: string
          instagram_handle: string | null
          is_verified: boolean | null
          logo_url: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          about?: string | null
          brand_name: string
          business_contact?: string | null
          business_niche?: string | null
          created_at?: string | null
          id: string
          instagram_handle?: string | null
          is_verified?: boolean | null
          logo_url?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          about?: string | null
          brand_name?: string
          business_contact?: string | null
          business_niche?: string | null
          created_at?: string | null
          id?: string
          instagram_handle?: string | null
          is_verified?: boolean | null
          logo_url?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "brands_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_applications: {
        Row: {
          admin_notes: string | null
          application_message: string | null
          applied_at: string | null
          campaign_id: string
          creator_id: string
          id: string
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          application_message?: string | null
          applied_at?: string | null
          campaign_id: string
          creator_id: string
          id?: string
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          application_message?: string | null
          applied_at?: string | null
          campaign_id?: string
          creator_id?: string
          id?: string
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_applications_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_applications_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          brand_id: string
          created_at: string | null
          deadline: string | null
          deliverables: string
          description: string
          hashtags: string[] | null
          id: string
          max_applicants: number | null
          reward_details: string | null
          reward_type: Database["public"]["Enums"]["reward_type"]
          status: Database["public"]["Enums"]["campaign_status"] | null
          target_city: string
          target_niche: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          brand_id: string
          created_at?: string | null
          deadline?: string | null
          deliverables: string
          description: string
          hashtags?: string[] | null
          id?: string
          max_applicants?: number | null
          reward_details?: string | null
          reward_type: Database["public"]["Enums"]["reward_type"]
          status?: Database["public"]["Enums"]["campaign_status"] | null
          target_city: string
          target_niche?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          brand_id?: string
          created_at?: string | null
          deadline?: string | null
          deliverables?: string
          description?: string
          hashtags?: string[] | null
          id?: string
          max_applicants?: number | null
          reward_details?: string | null
          reward_type?: Database["public"]["Enums"]["reward_type"]
          status?: Database["public"]["Enums"]["campaign_status"] | null
          target_city?: string
          target_niche?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      creator_requests: {
        Row: {
          admin_notes: string | null
          city: string
          content_niche: string | null
          created_at: string | null
          email: string
          id: string
          instagram_handle: string | null
          mobile_number: string | null
          name: string
          state: string | null
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          city: string
          content_niche?: string | null
          created_at?: string | null
          email: string
          id?: string
          instagram_handle?: string | null
          mobile_number?: string | null
          name: string
          state?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          city?: string
          content_niche?: string | null
          created_at?: string | null
          email?: string
          id?: string
          instagram_handle?: string | null
          mobile_number?: string | null
          name?: string
          state?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      creators: {
        Row: {
          about: string | null
          avg_comments: number | null
          avg_likes: number | null
          bio: string | null
          campaign_tags: string[] | null
          city: string
          content_niche: string | null
          country: string | null
          created_at: string | null
          engagement_rate: number | null
          follower_count: number | null
          id: string
          instagram_handle: string | null
          is_verified: boolean | null
          latest_posts_links: string[] | null
          mobile_number: string | null
          name: string
          portfolio_links: string[] | null
          profile_picture_url: string | null
          state: string | null
          total_posts: number | null
          updated_at: string | null
        }
        Insert: {
          about?: string | null
          avg_comments?: number | null
          avg_likes?: number | null
          bio?: string | null
          campaign_tags?: string[] | null
          city: string
          content_niche?: string | null
          country?: string | null
          created_at?: string | null
          engagement_rate?: number | null
          follower_count?: number | null
          id: string
          instagram_handle?: string | null
          is_verified?: boolean | null
          latest_posts_links?: string[] | null
          mobile_number?: string | null
          name: string
          portfolio_links?: string[] | null
          profile_picture_url?: string | null
          state?: string | null
          total_posts?: number | null
          updated_at?: string | null
        }
        Update: {
          about?: string | null
          avg_comments?: number | null
          avg_likes?: number | null
          bio?: string | null
          campaign_tags?: string[] | null
          city?: string
          content_niche?: string | null
          country?: string | null
          created_at?: string | null
          engagement_rate?: number | null
          follower_count?: number | null
          id?: string
          instagram_handle?: string | null
          is_verified?: boolean | null
          latest_posts_links?: string[] | null
          mobile_number?: string | null
          name?: string
          portfolio_links?: string[] | null
          profile_picture_url?: string | null
          state?: string | null
          total_posts?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "creators_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          receiver_id: string
          sender_id: string
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          receiver_id: string
          sender_id: string
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      application_status:
        | "pending"
        | "accepted"
        | "rejected"
        | "ongoing"
        | "completed"
      campaign_status: "draft" | "active" | "closed" | "completed"
      reward_type: "cash" | "barter" | "both"
      user_role: "creator" | "brand" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      application_status: [
        "pending",
        "accepted",
        "rejected",
        "ongoing",
        "completed",
      ],
      campaign_status: ["draft", "active", "closed", "completed"],
      reward_type: ["cash", "barter", "both"],
      user_role: ["creator", "brand", "admin"],
    },
  },
} as const
