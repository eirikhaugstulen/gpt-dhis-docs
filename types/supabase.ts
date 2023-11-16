export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      conversations: {
        Row: {
          conversationId: string | null
          created_at: string | null
          id: number
          message: string | null
        }
        Insert: {
          conversationId?: string | null
          created_at?: string | null
          id?: number
          message?: string | null
        }
        Update: {
          conversationId?: string | null
          created_at?: string | null
          id?: number
          message?: string | null
        }
        Relationships: []
      }
      current_jobs: {
        Row: {
          job_id: number
          request_id: number
        }
        Insert: {
          job_id: number
          request_id: number
        }
        Update: {
          job_id?: number
          request_id?: number
        }
        Relationships: []
      }
      job_queue: {
        Row: {
          content: string | null
          created_at: string | null
          http_verb: string
          job_id: number
          payload: Json | null
          retry_count: number | null
          retry_limit: number | null
          status: string
          url_path: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          http_verb: string
          job_id?: number
          payload?: Json | null
          retry_count?: number | null
          retry_limit?: number | null
          status?: string
          url_path?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          http_verb?: string
          job_id?: number
          payload?: Json | null
          retry_count?: number | null
          retry_limit?: number | null
          status?: string
          url_path?: string | null
        }
        Relationships: []
      }
      nods_page: {
        Row: {
          checksum: string | null
          id: number
          meta: Json | null
          parent_page_id: number | null
          path: string
          source: string | null
          type: string | null
        }
        Insert: {
          checksum?: string | null
          id?: number
          meta?: Json | null
          parent_page_id?: number | null
          path: string
          source?: string | null
          type?: string | null
        }
        Update: {
          checksum?: string | null
          id?: number
          meta?: Json | null
          parent_page_id?: number | null
          path?: string
          source?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nods_page_parent_page_id_fkey"
            columns: ["parent_page_id"]
            isOneToOne: false
            referencedRelation: "nods_page"
            referencedColumns: ["id"]
          }
        ]
      }
      nods_page_section: {
        Row: {
          content: string | null
          embedding: string | null
          heading: string | null
          id: number
          page_id: number
          slug: string | null
          token_count: number | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          heading?: string | null
          id?: number
          page_id: number
          slug?: string | null
          token_count?: number | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          heading?: string | null
          id?: number
          page_id?: number
          slug?: string | null
          token_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "nods_page_section_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "nods_page"
            referencedColumns: ["id"]
          }
        ]
      }
      unanswered_questions: {
        Row: {
          created_at: string | null
          id: number
          query: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          query: string
        }
        Update: {
          created_at?: string | null
          id?: number
          query?: string
        }
        Relationships: []
      }
      workers: {
        Row: {
          id: number
          locked: boolean
        }
        Insert: {
          id?: number
          locked?: boolean
        }
        Update: {
          id?: number
          locked?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_page_parents: {
        Args: {
          page_id: number
        }
        Returns: {
          id: number
          parent_page_id: number
          path: string
          meta: Json
        }[]
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      match_documents: {
        Args: {
          query_embedding: string
          match_count: number
        }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_page_sections: {
        Args: {
          embedding: string
          match_threshold: number
          match_count: number
          min_content_length: number
        }
        Returns: {
          id: number
          page_id: number
          slug: string
          heading: string
          content: string
          similarity: number
        }[]
      }
      process_current_jobs: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      process_current_jobs_if_unlocked: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      process_tasks_subminute: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      request_wrapper: {
        Args: {
          method: string
          url: string
          params?: Json
          body?: Json
          headers?: Json
        }
        Returns: number
      }
      retry_failed_jobs: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
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
