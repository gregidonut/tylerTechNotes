export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ticket_content: {
        Row: {
          body: string | null
          deleted: boolean
          status: Database["public"]["Enums"]["ticket_status"]
          ticket_content_id: number
          ticket_id: string
          title: string
          updated_at: string
          user_tenant_id: number | null
        }
        Insert: {
          body?: string | null
          deleted?: boolean
          status?: Database["public"]["Enums"]["ticket_status"]
          ticket_content_id?: never
          ticket_id: string
          title: string
          updated_at?: string
          user_tenant_id?: number | null
        }
        Update: {
          body?: string | null
          deleted?: boolean
          status?: Database["public"]["Enums"]["ticket_status"]
          ticket_content_id?: never
          ticket_id?: string
          title?: string
          updated_at?: string
          user_tenant_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_content_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["ticket_id"]
          },
          {
            foreignKeyName: "ticket_content_user_tenant_id_fkey"
            columns: ["user_tenant_id"]
            isOneToOne: false
            referencedRelation: "user_tenant"
            referencedColumns: ["user_tenant_id"]
          },
        ]
      }
      tickets: {
        Row: {
          created_at: string
          ticket_id: string
          user_tenant_id: number | null
        }
        Insert: {
          created_at?: string
          ticket_id?: string
          user_tenant_id?: number | null
        }
        Update: {
          created_at?: string
          ticket_id?: string
          user_tenant_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_user_tenant_id_fkey"
            columns: ["user_tenant_id"]
            isOneToOne: false
            referencedRelation: "user_tenant"
            referencedColumns: ["user_tenant_id"]
          },
        ]
      }
      user_tenant: {
        Row: {
          created_at: string
          tenant_id: string | null
          user_id: string
          user_tenant_id: number
        }
        Insert: {
          created_at?: string
          tenant_id?: string | null
          user_id?: string
          user_tenant_id?: never
        }
        Update: {
          created_at?: string
          tenant_id?: string | null
          user_id?: string
          user_tenant_id?: never
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_ticket: {
        Args: {
          p_body?: string
          p_status?: Database["public"]["Enums"]["ticket_status"]
          p_title: string
        }
        Returns: {
          ticket_id: string
        }[]
      }
      get_tickets: {
        Args: Record<PropertyKey, never>
        Returns: {
          body: string
          created_at: string
          deleted: boolean
          status: Database["public"]["Enums"]["ticket_status"]
          tenant_id: string
          ticket_id: string
          title: string
          updated_at: string
          updated_by: string
          user_id: string
        }[]
      }
    }
    Enums: {
      ticket_status: "open" | "in_progress" | "closed"
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
      ticket_status: ["open", "in_progress", "closed"],
    },
  },
} as const

