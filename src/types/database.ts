export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.18";
  };
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string;
          display_name: string | null;
          id: string;
          is_active: boolean;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          display_name?: string | null;
          id: string;
          is_active?: boolean;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          display_name?: string | null;
          id?: string;
          is_active?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          address: string | null;
          contact_person: string | null;
          created_at: string;
          email: string | null;
          id: string;
          is_sample: boolean;
          latitude: number | null;
          longitude: number | null;
          phone: string | null;
          province: string;
          regency: string;
          service_hours: string | null;
          singleton: boolean;
          social_links: Json;
          status: string;
          subdistrict: string;
          tagline: string | null;
          updated_at: string;
          village_name: string;
        };
        Insert: {
          address?: string | null;
          contact_person?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          is_sample?: boolean;
          latitude?: number | null;
          longitude?: number | null;
          phone?: string | null;
          province: string;
          regency: string;
          service_hours?: string | null;
          singleton?: boolean;
          social_links?: Json;
          status?: string;
          subdistrict: string;
          tagline?: string | null;
          updated_at?: string;
          village_name: string;
        };
        Update: {
          address?: string | null;
          contact_person?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          is_sample?: boolean;
          latitude?: number | null;
          longitude?: number | null;
          phone?: string | null;
          province?: string;
          regency?: string;
          service_hours?: string | null;
          singleton?: boolean;
          social_links?: Json;
          status?: string;
          subdistrict?: string;
          tagline?: string | null;
          updated_at?: string;
          village_name?: string;
        };
        Relationships: [];
      };
      apbdes_realizations: {
        Row: {
          budget: number | null;
          created_at: string;
          currency: string;
          id: string;
          kind: string;
          label: string;
          realization: number | null;
          report_id: string;
          sort_order: number;
          source_note: string | null;
          updated_at: string;
        };
        Insert: {
          budget?: number | null;
          created_at?: string;
          currency?: string;
          id?: string;
          kind: string;
          label: string;
          realization?: number | null;
          report_id: string;
          sort_order?: number;
          source_note?: string | null;
          updated_at?: string;
        };
        Update: {
          budget?: number | null;
          created_at?: string;
          currency?: string;
          id?: string;
          kind?: string;
          label?: string;
          realization?: number | null;
          report_id?: string;
          sort_order?: number;
          source_note?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      apbdes_reports: {
        Row: {
          created_at: string;
          fiscal_year: number;
          id: string;
          notes: string | null;
          period_end: string | null;
          period_label: string;
          period_start: string | null;
          revision_id: string;
          source_document: string | null;
          source_note: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          fiscal_year: number;
          id?: string;
          notes?: string | null;
          period_end?: string | null;
          period_label: string;
          period_start?: string | null;
          revision_id: string;
          source_document?: string | null;
          source_note?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          fiscal_year?: number;
          id?: string;
          notes?: string | null;
          period_end?: string | null;
          period_label?: string;
          period_start?: string | null;
          revision_id?: string;
          source_document?: string | null;
          source_note?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      apbdes_revenue_sources: {
        Row: {
          budget: number | null;
          created_at: string;
          id: string;
          realization: number | null;
          report_id: string;
          sort_order: number;
          source_name: string;
          source_note: string | null;
          updated_at: string;
        };
        Insert: {
          budget?: number | null;
          created_at?: string;
          id?: string;
          realization?: number | null;
          report_id: string;
          sort_order?: number;
          source_name: string;
          source_note?: string | null;
          updated_at?: string;
        };
        Update: {
          budget?: number | null;
          created_at?: string;
          id?: string;
          realization?: number | null;
          report_id?: string;
          sort_order?: number;
          source_name?: string;
          source_note?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      news_articles: {
        Row: {
          author: string | null;
          category: string;
          content: string | null;
          created_at: string;
          excerpt: string | null;
          id: string;
          image_alt: string | null;
          image_url: string | null;
          published_at: string | null;
          slug: string;
          status: string;
          title: string;
          updated_at: string;
          views: number;
        };
        Insert: {
          author?: string | null;
          category?: string;
          content?: string | null;
          created_at?: string;
          excerpt?: string | null;
          id?: string;
          image_alt?: string | null;
          image_url?: string | null;
          published_at?: string | null;
          slug: string;
          status?: string;
          title: string;
          updated_at?: string;
          views?: number;
        };
        Update: {
          author?: string | null;
          category?: string;
          content?: string | null;
          created_at?: string;
          excerpt?: string | null;
          id?: string;
          image_alt?: string | null;
          image_url?: string | null;
          published_at?: string | null;
          slug?: string;
          status?: string;
          title?: string;
          updated_at?: string;
          views?: number;
        };
        Relationships: [];
      };
      apbdes_spending_fields: {
        Row: {
          budget: number | null;
          created_at: string;
          field_name: string;
          id: string;
          realization: number | null;
          report_id: string;
          sort_order: number;
          source_note: string | null;
          updated_at: string;
        };
        Insert: {
          budget?: number | null;
          created_at?: string;
          field_name: string;
          id?: string;
          realization?: number | null;
          report_id: string;
          sort_order?: number;
          source_note?: string | null;
          updated_at?: string;
        };
        Update: {
          budget?: number | null;
          created_at?: string;
          field_name?: string;
          id?: string;
          realization?: number | null;
          report_id?: string;
          sort_order?: number;
          source_note?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      content_audit_events: {
        Row: {
          action: string;
          actor_id: string | null;
          created_at: string;
          id: string;
          revision_id: string | null;
          section_key: string | null;
          summary: string | null;
        };
        Insert: {
          action: string;
          actor_id?: string | null;
          created_at?: string;
          id?: string;
          revision_id?: string | null;
          section_key?: string | null;
          summary?: string | null;
        };
        Update: {
          action?: string;
          actor_id?: string | null;
          created_at?: string;
          id?: string;
          revision_id?: string | null;
          section_key?: string | null;
          summary?: string | null;
        };
        Relationships: [];
      };
      content_revisions: {
        Row: {
          change_note: string | null;
          created_at: string;
          created_by: string | null;
          id: string;
          published_at: string | null;
          revision_no: number;
          section_id: string;
          source_note: string | null;
          status: string;
          updated_at: string;
        };
        Insert: {
          change_note?: string | null;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          published_at?: string | null;
          revision_no: number;
          section_id: string;
          source_note?: string | null;
          status?: string;
          updated_at?: string;
        };
        Update: {
          change_note?: string | null;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          published_at?: string | null;
          revision_no?: number;
          section_id?: string;
          source_note?: string | null;
          status?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      content_sections: {
        Row: {
          created_at: string;
          id: string;
          key: string;
          label: string;
          published_revision_id: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          key: string;
          label: string;
          published_revision_id?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          key?: string;
          label?: string;
          published_revision_id?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      home_content: {
        Row: {
          created_at: string;
          help_note: string | null;
          help_phone: string | null;
          hero_subtitle: string | null;
          hero_title: string | null;
          id: string;
          revision_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          help_note?: string | null;
          help_phone?: string | null;
          hero_subtitle?: string | null;
          hero_title?: string | null;
          id?: string;
          revision_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          help_note?: string | null;
          help_phone?: string | null;
          hero_subtitle?: string | null;
          hero_title?: string | null;
          id?: string;
          revision_id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      home_gallery_items: {
        Row: {
          alt_override: string | null;
          caption: string | null;
          created_at: string;
          id: string;
          media_asset_id: string;
          revision_id: string;
          sort_order: number;
          title: string | null;
          updated_at: string;
        };
        Insert: {
          alt_override?: string | null;
          caption?: string | null;
          created_at?: string;
          id?: string;
          media_asset_id: string;
          revision_id: string;
          sort_order?: number;
          title?: string | null;
          updated_at?: string;
        };
        Update: {
          alt_override?: string | null;
          caption?: string | null;
          created_at?: string;
          id?: string;
          media_asset_id?: string;
          revision_id?: string;
          sort_order?: number;
          title?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      media_assets: {
        Row: {
          alt_text: string | null;
          asset_folder: string | null;
          asset_id: string | null;
          bucket: string | null;
          checksum: string | null;
          created_at: string;
          format: string | null;
          height: number | null;
          id: string;
          mime_type: string | null;
          original_filename: string | null;
          provider: string;
          public_id: string | null;
          resource_type: string;
          secure_url: string | null;
          size_bytes: number | null;
          storage_path: string | null;
          updated_at: string;
          uploaded_by: string | null;
          width: number | null;
        };
        Insert: {
          alt_text?: string | null;
          asset_folder?: string | null;
          asset_id?: string | null;
          bucket?: string | null;
          checksum?: string | null;
          created_at?: string;
          format?: string | null;
          height?: number | null;
          id?: string;
          mime_type?: string | null;
          original_filename?: string | null;
          provider?: string;
          public_id?: string | null;
          resource_type?: string;
          secure_url?: string | null;
          size_bytes?: number | null;
          storage_path?: string | null;
          updated_at?: string;
          uploaded_by?: string | null;
          width?: number | null;
        };
        Update: {
          alt_text?: string | null;
          asset_folder?: string | null;
          asset_id?: string | null;
          bucket?: string | null;
          checksum?: string | null;
          created_at?: string;
          format?: string | null;
          height?: number | null;
          id?: string;
          mime_type?: string | null;
          original_filename?: string | null;
          provider?: string;
          public_id?: string | null;
          resource_type?: string;
          secure_url?: string | null;
          size_bytes?: number | null;
          storage_path?: string | null;
          updated_at?: string;
          uploaded_by?: string | null;
          width?: number | null;
        };
        Relationships: [];
      };
      population_area_uses: {
        Row: {
          area_unit: string | null;
          area_value: number | null;
          category: string;
          created_at: string;
          id: string;
          report_id: string;
          sort_order: number;
          source_note: string | null;
          updated_at: string;
        };
        Insert: {
          area_unit?: string | null;
          area_value?: number | null;
          category: string;
          created_at?: string;
          id?: string;
          report_id: string;
          sort_order?: number;
          source_note?: string | null;
          updated_at?: string;
        };
        Update: {
          area_unit?: string | null;
          area_value?: number | null;
          category?: string;
          created_at?: string;
          id?: string;
          report_id?: string;
          sort_order?: number;
          source_note?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      population_occupations: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          person_count: number | null;
          report_id: string;
          sort_order: number;
          source_note: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          person_count?: number | null;
          report_id: string;
          sort_order?: number;
          source_note?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          person_count?: number | null;
          report_id?: string;
          sort_order?: number;
          source_note?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      population_reports: {
        Row: {
          area_unit: string | null;
          area_value: number | null;
          created_at: string;
          data_updated_at: string | null;
          female_count: number | null;
          id: string;
          male_count: number | null;
          period_end: string | null;
          period_label: string;
          period_start: string | null;
          productive_age_count: number | null;
          revision_id: string;
          source_name: string | null;
          source_reference: string | null;
          total_households: number | null;
          total_population: number | null;
          updated_at: string;
        };
        Insert: {
          area_unit?: string | null;
          area_value?: number | null;
          created_at?: string;
          data_updated_at?: string | null;
          female_count?: number | null;
          id?: string;
          male_count?: number | null;
          period_end?: string | null;
          period_label: string;
          period_start?: string | null;
          productive_age_count?: number | null;
          revision_id: string;
          source_name?: string | null;
          source_reference?: string | null;
          total_households?: number | null;
          total_population?: number | null;
          updated_at?: string;
        };
        Update: {
          area_unit?: string | null;
          area_value?: number | null;
          created_at?: string;
          data_updated_at?: string | null;
          female_count?: number | null;
          id?: string;
          male_count?: number | null;
          period_end?: string | null;
          period_label?: string;
          period_start?: string | null;
          productive_age_count?: number | null;
          revision_id?: string;
          source_name?: string | null;
          source_reference?: string | null;
          total_households?: number | null;
          total_population?: number | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      profile_boundaries: {
        Row: {
          created_at: string;
          description: string | null;
          direction: string;
          id: string;
          label: string;
          revision_id: string;
          sort_order: number;
          source_note: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          direction: string;
          id?: string;
          label: string;
          revision_id: string;
          sort_order?: number;
          source_note?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          direction?: string;
          id?: string;
          label?: string;
          revision_id?: string;
          sort_order?: number;
          source_note?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      profile_content: {
        Row: {
          area_unit: string | null;
          area_value: number | null;
          created_at: string;
          distance_to_capital_unit: string | null;
          distance_to_capital_value: number | null;
          history_text: string | null;
          id: string;
          population_count: number | null;
          revision_id: string;
          source_note: string | null;
          updated_at: string;
        };
        Insert: {
          area_unit?: string | null;
          area_value?: number | null;
          created_at?: string;
          distance_to_capital_unit?: string | null;
          distance_to_capital_value?: number | null;
          history_text?: string | null;
          id?: string;
          population_count?: number | null;
          revision_id: string;
          source_note?: string | null;
          updated_at?: string;
        };
        Update: {
          area_unit?: string | null;
          area_value?: number | null;
          created_at?: string;
          distance_to_capital_unit?: string | null;
          distance_to_capital_value?: number | null;
          history_text?: string | null;
          id?: string;
          population_count?: number | null;
          revision_id?: string;
          source_note?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      village_documents: {
        Row: {
          alt_text: string | null;
          created_at: string;
          description: string | null;
          doc_type: string;
          id: string;
          is_public: boolean;
          mime_type: string | null;
          revision_id: string;
          size_bytes: number | null;
          sort_order: number;
          storage_path: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          alt_text?: string | null;
          created_at?: string;
          description?: string | null;
          doc_type: string;
          id?: string;
          is_public?: boolean;
          mime_type?: string | null;
          revision_id: string;
          size_bytes?: number | null;
          sort_order?: number;
          storage_path: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          alt_text?: string | null;
          created_at?: string;
          description?: string | null;
          doc_type?: string;
          id?: string;
          is_public?: boolean;
          mime_type?: string | null;
          revision_id?: string;
          size_bytes?: number | null;
          sort_order?: number;
          storage_path?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      village_officers: {
        Row: {
          created_at: string;
          description: string | null;
          full_name: string;
          id: string;
          is_active: boolean;
          parent_id: string | null;
          photo_asset_id: string | null;
          position: string;
          revision_id: string;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          full_name: string;
          id?: string;
          is_active?: boolean;
          parent_id?: string | null;
          photo_asset_id?: string | null;
          position: string;
          revision_id: string;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          full_name?: string;
          id?: string;
          is_active?: boolean;
          parent_id?: string | null;
          photo_asset_id?: string | null;
          position?: string;
          revision_id?: string;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      publish_content_revision: {
        Args: { p_revision_id: string };
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof DatabaseWithoutInternals,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer Row;
    }
    ? Row
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer Row;
      }
      ? Row
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer Insert;
    }
    ? Insert
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer Insert;
      }
      ? Insert
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer Update;
    }
    ? Update
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer Update;
      }
      ? Update
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
