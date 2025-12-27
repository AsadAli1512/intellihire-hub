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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_logs: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string
          details: Json | null
          id: string
          target_id: string | null
          target_type: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          target_id?: string | null
          target_type?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          target_id?: string | null
          target_type?: string | null
        }
        Relationships: []
      }
      applications: {
        Row: {
          ai_feedback: string | null
          ai_score: number | null
          applied_at: string
          candidate_id: string
          cover_letter: string | null
          id: string
          interview_slot_id: string | null
          job_id: string
          notes: string | null
          recruiter_id: string
          resume_url: string
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string
        }
        Insert: {
          ai_feedback?: string | null
          ai_score?: number | null
          applied_at?: string
          candidate_id: string
          cover_letter?: string | null
          id?: string
          interview_slot_id?: string | null
          job_id: string
          notes?: string | null
          recruiter_id: string
          resume_url: string
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string
        }
        Update: {
          ai_feedback?: string | null
          ai_score?: number | null
          applied_at?: string
          candidate_id?: string
          cover_letter?: string | null
          id?: string
          interview_slot_id?: string | null
          job_id?: string
          notes?: string | null
          recruiter_id?: string
          resume_url?: string
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_interview_slot_id_fkey"
            columns: ["interview_slot_id"]
            isOneToOne: false
            referencedRelation: "interview_slots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_profiles: {
        Row: {
          bio: string | null
          created_at: string
          custom_skills: string[] | null
          education: string | null
          experience_years: number | null
          id: string
          linkedin_url: string | null
          location: string | null
          resume_url: string | null
          skills: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          custom_skills?: string[] | null
          education?: string | null
          experience_years?: number | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          custom_skills?: string[] | null
          education?: string | null
          experience_years?: number | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      interview_slots: {
        Row: {
          booked_by: string | null
          created_at: string
          duration_minutes: number | null
          id: string
          is_booked: boolean | null
          job_id: string
          slot_date: string
          slot_time: string
        }
        Insert: {
          booked_by?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          is_booked?: boolean | null
          job_id: string
          slot_date: string
          slot_time: string
        }
        Update: {
          booked_by?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          is_booked?: boolean | null
          job_id?: string
          slot_date?: string
          slot_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_slots_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          applications_count: number | null
          created_at: string
          deadline: string | null
          description: string
          experience_required: number | null
          id: string
          job_type: string
          location: string
          recruiter_id: string
          requirements: string | null
          responsibilities: string | null
          salary_max: number | null
          salary_min: number | null
          skills_required: string[] | null
          status: Database["public"]["Enums"]["job_status"] | null
          title: string
          updated_at: string
          views_count: number | null
        }
        Insert: {
          applications_count?: number | null
          created_at?: string
          deadline?: string | null
          description: string
          experience_required?: number | null
          id?: string
          job_type: string
          location: string
          recruiter_id: string
          requirements?: string | null
          responsibilities?: string | null
          salary_max?: number | null
          salary_min?: number | null
          skills_required?: string[] | null
          status?: Database["public"]["Enums"]["job_status"] | null
          title: string
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          applications_count?: number | null
          created_at?: string
          deadline?: string | null
          description?: string
          experience_required?: number | null
          id?: string
          job_type?: string
          location?: string
          recruiter_id?: string
          requirements?: string | null
          responsibilities?: string | null
          salary_max?: number | null
          salary_min?: number | null
          skills_required?: string[] | null
          status?: Database["public"]["Enums"]["job_status"] | null
          title?: string
          updated_at?: string
          views_count?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          profile_completed: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          phone?: string | null
          profile_completed?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          profile_completed?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      recruiter_profiles: {
        Row: {
          company_address: string | null
          company_description: string | null
          company_logo_url: string | null
          company_name: string
          company_website: string | null
          created_at: string
          documents_url: string | null
          id: string
          ntn_number: string | null
          rejection_reason: string | null
          updated_at: string
          user_id: string
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          company_address?: string | null
          company_description?: string | null
          company_logo_url?: string | null
          company_name: string
          company_website?: string | null
          created_at?: string
          documents_url?: string | null
          id?: string
          ntn_number?: string | null
          rejection_reason?: string | null
          updated_at?: string
          user_id: string
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          company_address?: string | null
          company_description?: string | null
          company_logo_url?: string | null
          company_name?: string
          company_website?: string | null
          created_at?: string
          documents_url?: string | null
          id?: string
          ntn_number?: string | null
          rejection_reason?: string | null
          updated_at?: string
          user_id?: string
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          applications_limit: number | null
          billing_cycle: string | null
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean | null
          jobs_limit: number | null
          plan_name: string
          plan_type: string
          price: number
          starts_at: string
          user_id: string
        }
        Insert: {
          applications_limit?: number | null
          billing_cycle?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          jobs_limit?: number | null
          plan_name: string
          plan_type: string
          price: number
          starts_at?: string
          user_id: string
        }
        Update: {
          applications_limit?: number | null
          billing_cycle?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          jobs_limit?: number | null
          plan_name?: string
          plan_type?: string
          price?: number
          starts_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "recruiter" | "candidate"
      application_status:
        | "pending"
        | "reviewed"
        | "shortlisted"
        | "interviewed"
        | "offered"
        | "rejected"
        | "withdrawn"
      job_status: "draft" | "active" | "paused" | "closed" | "expired"
      verification_status: "pending" | "approved" | "rejected"
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
      app_role: ["admin", "recruiter", "candidate"],
      application_status: [
        "pending",
        "reviewed",
        "shortlisted",
        "interviewed",
        "offered",
        "rejected",
        "withdrawn",
      ],
      job_status: ["draft", "active", "paused", "closed", "expired"],
      verification_status: ["pending", "approved", "rejected"],
    },
  },
} as const
