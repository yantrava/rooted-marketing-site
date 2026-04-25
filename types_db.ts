export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      api_usage: {
        Row: {
          api_name: string
          call_count: number
          daily_limit: number
          date_utc: string
          id: string
          updated_at: string | null
        }
        Insert: {
          api_name: string
          call_count?: number
          daily_limit: number
          date_utc: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          api_name?: string
          call_count?: number
          daily_limit?: number
          date_utc?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      care_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          notes: string | null
          photo_url: string | null
          plant_id: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          notes?: string | null
          photo_url?: string | null
          plant_id: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          photo_url?: string | null
          plant_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "care_logs_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      care_tasks: {
        Row: {
          completed_at: string | null
          created_at: string | null
          due_date: string
          id: string
          notes: string | null
          plant_id: string
          snoozed_until: string | null
          task_type: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          due_date: string
          id?: string
          notes?: string | null
          plant_id: string
          snoozed_until?: string | null
          task_type: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          due_date?: string
          id?: string
          notes?: string | null
          plant_id?: string
          snoozed_until?: string | null
          task_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "care_tasks_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_tasks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      health_assessments: {
        Row: {
          api_response: Json
          created_at: string | null
          id: string
          image_url: string | null
          is_healthy: boolean | null
          is_healthy_probability: number | null
          latency_ms: number | null
          model_version: string | null
          plant_id: string | null
          top_disease_name: string | null
          top_disease_probability: number | null
          user_id: string
        }
        Insert: {
          api_response: Json
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_healthy?: boolean | null
          is_healthy_probability?: number | null
          latency_ms?: number | null
          model_version?: string | null
          plant_id?: string | null
          top_disease_name?: string | null
          top_disease_probability?: number | null
          user_id: string
        }
        Update: {
          api_response?: Json
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_healthy?: boolean | null
          is_healthy_probability?: number | null
          latency_ms?: number | null
          model_version?: string | null
          plant_id?: string | null
          top_disease_name?: string | null
          top_disease_probability?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "health_assessments_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plants"
            referencedColumns: ["id"]
          },
        ]
      }
      identifications: {
        Row: {
          created_at: string | null
          device_inference_ms: number | null
          device_top1_confidence: number | null
          device_top1_species: string | null
          final_common_name: string | null
          final_confidence: number | null
          final_source: string | null
          final_species: string
          id: string
          is_correct: boolean | null
          photo_urls: string[]
          plant_id: string | null
          plantid_latency_ms: number | null
          plantid_top1_confidence: number | null
          plantid_top1_species: string | null
          plantid_top3: Json | null
          plantnet_latency_ms: number | null
          plantnet_top1_confidence: number | null
          plantnet_top1_species: string | null
          plantnet_top3: Json | null
          user_corrected_species: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_inference_ms?: number | null
          device_top1_confidence?: number | null
          device_top1_species?: string | null
          final_common_name?: string | null
          final_confidence?: number | null
          final_source?: string | null
          final_species: string
          id?: string
          is_correct?: boolean | null
          photo_urls: string[]
          plant_id?: string | null
          plantid_latency_ms?: number | null
          plantid_top1_confidence?: number | null
          plantid_top1_species?: string | null
          plantid_top3?: Json | null
          plantnet_latency_ms?: number | null
          plantnet_top1_confidence?: number | null
          plantnet_top1_species?: string | null
          plantnet_top3?: Json | null
          user_corrected_species?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_inference_ms?: number | null
          device_top1_confidence?: number | null
          device_top1_species?: string | null
          final_common_name?: string | null
          final_confidence?: number | null
          final_source?: string | null
          final_species?: string
          id?: string
          is_correct?: boolean | null
          photo_urls?: string[]
          plant_id?: string | null
          plantid_latency_ms?: number | null
          plantid_top1_confidence?: number | null
          plantid_top1_species?: string | null
          plantid_top3?: Json | null
          plantnet_latency_ms?: number | null
          plantnet_top1_confidence?: number | null
          plantnet_top1_species?: string | null
          plantnet_top3?: Json | null
          user_corrected_species?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "identifications_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "identifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      perenual_pests: {
        Row: {
          category: string | null
          common_name: string | null
          created_at: string | null
          description: Json | null
          family: string | null
          host: Json | null
          id: number
          images: Json | null
          other_name: Json | null
          scientific_name: Json | null
          solution: Json | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          common_name?: string | null
          created_at?: string | null
          description?: Json | null
          family?: string | null
          host?: Json | null
          id: number
          images?: Json | null
          other_name?: Json | null
          scientific_name?: Json | null
          solution?: Json | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          common_name?: string | null
          created_at?: string | null
          description?: Json | null
          family?: string | null
          host?: Json | null
          id?: number
          images?: Json | null
          other_name?: Json | null
          scientific_name?: Json | null
          solution?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      plant_care_data: {
        Row: {
          common_name: string | null
          common_pests: Json | null
          common_problems: Json | null
          common_symptoms: Json | null
          created_at: string | null
          data_source: string | null
          description: string | null
          difficulty: string | null
          fertilize_frequency_days: number | null
          fertilize_method: string | null
          fertilize_season: string | null
          foliage_type: string | null
          fun_fact: string | null
          growth_rate: string | null
          hardiness_zone: string | null
          height_max_cm: number | null
          height_min_cm: number | null
          humidity_level: string | null
          humidity_max: number | null
          humidity_min: number | null
          id: string
          indoor_months: string | null
          is_toxic_humans: boolean | null
          is_toxic_pets: boolean | null
          last_updated: string | null
          leaf_colors: Json | null
          light_lux_max: number | null
          light_lux_min: number | null
          light_requirement: string | null
          misting_frequency_days: number | null
          outdoor_months: string | null
          perenual_id: number | null
          propagation_methods: Json | null
          repot_frequency_months: number | null
          soil_type: string | null
          species_name: string
          spread_max_cm: number | null
          spread_min_cm: number | null
          temp_ideal_max_c: number | null
          temp_ideal_min_c: number | null
          temp_max_c: number | null
          temp_min_c: number | null
          toxicity_notes: string | null
          toxicity_verified: boolean
          water_frequency: string | null
          water_frequency_days: number | null
          water_method: string | null
        }
        Insert: {
          common_name?: string | null
          common_pests?: Json | null
          common_problems?: Json | null
          common_symptoms?: Json | null
          created_at?: string | null
          data_source?: string | null
          description?: string | null
          difficulty?: string | null
          fertilize_frequency_days?: number | null
          fertilize_method?: string | null
          fertilize_season?: string | null
          foliage_type?: string | null
          fun_fact?: string | null
          growth_rate?: string | null
          hardiness_zone?: string | null
          height_max_cm?: number | null
          height_min_cm?: number | null
          humidity_level?: string | null
          humidity_max?: number | null
          humidity_min?: number | null
          id?: string
          indoor_months?: string | null
          is_toxic_humans?: boolean | null
          is_toxic_pets?: boolean | null
          last_updated?: string | null
          leaf_colors?: Json | null
          light_lux_max?: number | null
          light_lux_min?: number | null
          light_requirement?: string | null
          misting_frequency_days?: number | null
          outdoor_months?: string | null
          perenual_id?: number | null
          propagation_methods?: Json | null
          repot_frequency_months?: number | null
          soil_type?: string | null
          species_name: string
          spread_max_cm?: number | null
          spread_min_cm?: number | null
          temp_ideal_max_c?: number | null
          temp_ideal_min_c?: number | null
          temp_max_c?: number | null
          temp_min_c?: number | null
          toxicity_notes?: string | null
          toxicity_verified?: boolean
          water_frequency?: string | null
          water_frequency_days?: number | null
          water_method?: string | null
        }
        Update: {
          common_name?: string | null
          common_pests?: Json | null
          common_problems?: Json | null
          common_symptoms?: Json | null
          created_at?: string | null
          data_source?: string | null
          description?: string | null
          difficulty?: string | null
          fertilize_frequency_days?: number | null
          fertilize_method?: string | null
          fertilize_season?: string | null
          foliage_type?: string | null
          fun_fact?: string | null
          growth_rate?: string | null
          hardiness_zone?: string | null
          height_max_cm?: number | null
          height_min_cm?: number | null
          humidity_level?: string | null
          humidity_max?: number | null
          humidity_min?: number | null
          id?: string
          indoor_months?: string | null
          is_toxic_humans?: boolean | null
          is_toxic_pets?: boolean | null
          last_updated?: string | null
          leaf_colors?: Json | null
          light_lux_max?: number | null
          light_lux_min?: number | null
          light_requirement?: string | null
          misting_frequency_days?: number | null
          outdoor_months?: string | null
          perenual_id?: number | null
          propagation_methods?: Json | null
          repot_frequency_months?: number | null
          soil_type?: string | null
          species_name?: string
          spread_max_cm?: number | null
          spread_min_cm?: number | null
          temp_ideal_max_c?: number | null
          temp_ideal_min_c?: number | null
          temp_max_c?: number | null
          temp_min_c?: number | null
          toxicity_notes?: string | null
          toxicity_verified?: boolean
          water_frequency?: string | null
          water_frequency_days?: number | null
          water_method?: string | null
        }
        Relationships: []
      }
      plants: {
        Row: {
          acquisition_date: string | null
          care_interest: string | null
          care_skill: string | null
          common_name: string | null
          created_at: string | null
          difficulty: string | null
          fertilize_frequency_days: number | null
          fertilizer_method: string | null
          health_score: number | null
          health_status: string | null
          id: string
          is_indoor: boolean | null
          is_toxic: boolean | null
          last_fertilized_at: string | null
          last_repotted_at: string | null
          last_watered_at: string | null
          light_level: string | null
          location_in_home: string | null
          near_ac: boolean | null
          near_heater: boolean | null
          next_fertilize_date: string | null
          next_water_date: string | null
          nickname: string | null
          notes: string | null
          photo_url: string | null
          plant_size_cm: number | null
          pot_has_drainage: boolean | null
          pot_material: string | null
          pot_size: string | null
          pot_size_cm: number | null
          soil_type: string | null
          species_name: string
          updated_at: string | null
          user_id: string
          water_frequency_days: number | null
        }
        Insert: {
          acquisition_date?: string | null
          care_interest?: string | null
          care_skill?: string | null
          common_name?: string | null
          created_at?: string | null
          difficulty?: string | null
          fertilize_frequency_days?: number | null
          fertilizer_method?: string | null
          health_score?: number | null
          health_status?: string | null
          id?: string
          is_indoor?: boolean | null
          is_toxic?: boolean | null
          last_fertilized_at?: string | null
          last_repotted_at?: string | null
          last_watered_at?: string | null
          light_level?: string | null
          location_in_home?: string | null
          near_ac?: boolean | null
          near_heater?: boolean | null
          next_fertilize_date?: string | null
          next_water_date?: string | null
          nickname?: string | null
          notes?: string | null
          photo_url?: string | null
          plant_size_cm?: number | null
          pot_has_drainage?: boolean | null
          pot_material?: string | null
          pot_size?: string | null
          pot_size_cm?: number | null
          soil_type?: string | null
          species_name: string
          updated_at?: string | null
          user_id: string
          water_frequency_days?: number | null
        }
        Update: {
          acquisition_date?: string | null
          care_interest?: string | null
          care_skill?: string | null
          common_name?: string | null
          created_at?: string | null
          difficulty?: string | null
          fertilize_frequency_days?: number | null
          fertilizer_method?: string | null
          health_score?: number | null
          health_status?: string | null
          id?: string
          is_indoor?: boolean | null
          is_toxic?: boolean | null
          last_fertilized_at?: string | null
          last_repotted_at?: string | null
          last_watered_at?: string | null
          light_level?: string | null
          location_in_home?: string | null
          near_ac?: boolean | null
          near_heater?: boolean | null
          next_fertilize_date?: string | null
          next_water_date?: string | null
          nickname?: string | null
          notes?: string | null
          photo_url?: string | null
          plant_size_cm?: number | null
          pot_has_drainage?: boolean | null
          pot_material?: string | null
          pot_size?: string | null
          pot_size_cm?: number | null
          soil_type?: string | null
          species_name?: string
          updated_at?: string | null
          user_id?: string
          water_frequency_days?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "plants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          comments_count: number
          content: string
          created_at: string
          id: string
          image_url: string | null
          likes_count: number
          post_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          comments_count?: number
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          likes_count?: number
          post_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          comments_count?: number
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          likes_count?: number
          post_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          garden_name: string | null
          id: string
          is_premium: boolean | null
          latitude: number | null
          location: string | null
          longitude: number | null
          notification_preferences: Json | null
          preferred_units: string | null
          premium_expires_at: string | null
          skill_level: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          garden_name?: string | null
          id: string
          is_premium?: boolean | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          notification_preferences?: Json | null
          preferred_units?: string | null
          premium_expires_at?: string | null
          skill_level?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          garden_name?: string | null
          id?: string
          is_premium?: boolean | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          notification_preferences?: Json | null
          preferred_units?: string | null
          premium_expires_at?: string | null
          skill_level?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      swap_conversations: {
        Row: {
          created_at: string
          id: string
          last_message_at: string | null
          listing_id: string
          participant_a: string
          participant_b: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_message_at?: string | null
          listing_id: string
          participant_a: string
          participant_b: string
        }
        Update: {
          created_at?: string
          id?: string
          last_message_at?: string | null
          listing_id?: string
          participant_a?: string
          participant_b?: string
        }
        Relationships: [
          {
            foreignKeyName: "swap_conversations_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "swap_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_conversations_participant_a_fkey"
            columns: ["participant_a"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_conversations_participant_b_fkey"
            columns: ["participant_b"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      swap_listings: {
        Row: {
          city: string | null
          created_at: string
          description: string
          direction: string
          id: string
          latitude: number | null
          longitude: number | null
          photo_url: string | null
          plant_care_data_id: string | null
          species_name: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          description?: string
          direction: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          photo_url?: string | null
          plant_care_data_id?: string | null
          species_name: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          city?: string | null
          created_at?: string
          description?: string
          direction?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          photo_url?: string | null
          plant_care_data_id?: string | null
          species_name?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "swap_listings_plant_care_data_id_fkey"
            columns: ["plant_care_data_id"]
            isOneToOne: false
            referencedRelation: "plant_care_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_listings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      swap_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "swap_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "swap_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          source: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          source?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          source?: string | null
        }
        Relationships: []
      }
      weather_cache: {
        Row: {
          data: Json
          fetched_at: string | null
          hour_bucket: string
          id: string
          lat_rounded: number
          lng_rounded: number
          source: string
        }
        Insert: {
          data: Json
          fetched_at?: string | null
          hour_bucket: string
          id?: string
          lat_rounded: number
          lng_rounded: number
          source: string
        }
        Update: {
          data?: Json
          fetched_at?: string | null
          hour_bucket?: string
          id?: string
          lat_rounded?: number
          lng_rounded?: number
          source?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      haversine_km: {
        Args: { lat1: number; lat2: number; lon1: number; lon2: number }
        Returns: number
      }
      increment_api_usage: {
        Args: {
          p_api_name: string
          p_daily_limit: number
          p_increment?: number
        }
        Returns: {
          allowed: boolean
          new_count: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
