// Auto-generated types from Supabase schema
// Run: npx supabase gen types typescript --local > src/types/database.ts

export type MemberRole = 'owner' | 'leader' | 'proofreader' | 'translator'
export type ProjectStatus = 'active' | 'completed' | 'archived' | 'on_hold'
export type ProjectDomain = 'general' | 'medical' | 'pharmaceutical' | 'legal' | 'technical' | 'marketing'
export type SegmentStatus = 'untranslated' | 'draft' | 'translated' | 'proofread' | 'locked'
export type EvaluationType = 'ai_auto' | 'human_review' | 'peer_review'
export type QaIssueType = 'untranslated' | 'whitespace' | 'missing_term' | 'forbidden_term' | 'number_mismatch' | 'punctuation' | 'length_issue' | 'duplicate'
export type QaSeverity = 'error' | 'warning' | 'info'
export type NotificationType = 'task_assigned' | 'segment_reviewed' | 'project_completed' | 'comment_added' | 'mention' | 'deadline_reminder'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          preferred_language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          preferred_language?: string
        }
        Update: {
          full_name?: string | null
          avatar_url?: string | null
          preferred_language?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string | null
          source_language: string
          target_language: string
          domain: ProjectDomain
          status: ProjectStatus
          deadline: string | null
          owner_id: string
          word_count: number
          progress: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          source_language: string
          target_language: string
          domain?: ProjectDomain
          status?: ProjectStatus
          deadline?: string | null
          owner_id: string
        }
        Update: {
          name?: string
          description?: string | null
          status?: ProjectStatus
          deadline?: string | null
          domain?: ProjectDomain
        }
      }
      project_members: {
        Row: {
          id: string
          project_id: string
          user_id: string
          role: MemberRole
          joined_at: string
        }
        Insert: {
          project_id: string
          user_id: string
          role?: MemberRole
        }
        Update: {
          role?: MemberRole
        }
      }
      segments: {
        Row: {
          id: string
          project_id: string
          segment_number: number
          source_text: string
          target_text: string | null
          status: SegmentStatus
          quality_score: number | null
          ai_confidence: number | null
          word_count: number
          char_count: number
          locked: boolean
          translator_id: string | null
          proofreader_id: string | null
          translated_at: string | null
          proofread_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          project_id: string
          segment_number: number
          source_text: string
          target_text?: string | null
          status?: SegmentStatus
        }
        Update: {
          target_text?: string | null
          status?: SegmentStatus
          quality_score?: number | null
          ai_confidence?: number | null
          locked?: boolean
          translator_id?: string | null
          proofreader_id?: string | null
          translated_at?: string | null
          proofread_at?: string | null
        }
      }
      translation_memories: {
        Row: {
          id: string
          name: string
          description: string | null
          source_language: string
          target_language: string
          domain: ProjectDomain
          owner_id: string
          is_public: boolean
          entry_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          description?: string | null
          source_language: string
          target_language: string
          domain?: ProjectDomain
          owner_id: string
          is_public?: boolean
        }
        Update: {
          name?: string
          description?: string | null
          is_public?: boolean
        }
      }
      tm_entries: {
        Row: {
          id: string
          tm_id: string
          source_text: string
          target_text: string
          quality: number
          usage_count: number
          metadata: Record<string, unknown>
          created_at: string
          updated_at: string
        }
        Insert: {
          tm_id: string
          source_text: string
          target_text: string
          quality?: number
          metadata?: Record<string, unknown>
        }
        Update: {
          target_text?: string
          quality?: number
        }
      }
      termbase_entries: {
        Row: {
          id: string
          project_id: string | null
          source_term: string
          target_term: string
          source_language: string
          target_language: string
          domain: ProjectDomain
          definition: string | null
          notes: string | null
          is_forbidden: boolean
          is_medical: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          project_id?: string | null
          source_term: string
          target_term: string
          source_language: string
          target_language: string
          domain?: ProjectDomain
          definition?: string | null
          notes?: string | null
          is_forbidden?: boolean
          is_medical?: boolean
          created_by?: string | null
        }
        Update: {
          target_term?: string
          definition?: string | null
          notes?: string | null
          is_forbidden?: boolean
        }
      }
      evaluations: {
        Row: {
          id: string
          segment_id: string
          project_id: string
          evaluation_type: EvaluationType
          score: number
          feedback: string | null
          error_categories: Record<string, number>
          evaluator_id: string | null
          created_at: string
        }
        Insert: {
          segment_id: string
          project_id: string
          evaluation_type?: EvaluationType
          score: number
          feedback?: string | null
          error_categories?: Record<string, number>
          evaluator_id?: string | null
        }
        Update: never
      }
      qa_checks: {
        Row: {
          id: string
          project_id: string
          segment_id: string
          issue_type: QaIssueType
          severity: QaSeverity
          message: string | null
          resolved: boolean
          resolved_by: string | null
          resolved_at: string | null
          created_at: string
        }
        Insert: {
          project_id: string
          segment_id: string
          issue_type: QaIssueType
          severity?: QaSeverity
          message?: string | null
        }
        Update: {
          resolved?: boolean
          resolved_by?: string | null
          resolved_at?: string | null
        }
      }
      ai_cache: {
        Row: {
          id: string
          cache_key: string
          operation: string
          input_hash: string
          response: Record<string, unknown>
          model: string
          hit_count: number
          expires_at: string | null
          created_at: string
        }
        Insert: {
          cache_key: string
          operation: string
          input_hash: string
          response: Record<string, unknown>
          model?: string
          expires_at?: string | null
        }
        Update: {
          hit_count?: number
          expires_at?: string | null
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          project_id: string | null
          type: NotificationType
          title: string
          body: string | null
          read: boolean
          action_url: string | null
          created_at: string
        }
        Insert: {
          user_id: string
          project_id?: string | null
          type: NotificationType
          title: string
          body?: string | null
          action_url?: string | null
        }
        Update: {
          read?: boolean
        }
      }
    }
    Enums: {
      member_role: MemberRole
      project_status: ProjectStatus
      project_domain: ProjectDomain
      segment_status: SegmentStatus
      evaluation_type: EvaluationType
      qa_issue_type: QaIssueType
      qa_severity: QaSeverity
      notification_type: NotificationType
    }
  }
}
