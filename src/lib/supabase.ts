import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Student {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  school_id: string
  grade: number
  project_title: string
  project_description: string
  category: string
  created_at: string
}

export interface School {
  id: string
  name: string
  address: string
  created_at: string
}

export interface Registration {
  id: string
  student_id: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}
