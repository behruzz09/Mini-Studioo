import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type UserRole = 'user' | 'freelancer' | 'admin'

export interface UserProfile {
  id: string
  email: string
  name: string
  role: UserRole
  isPro: boolean
  dailyUsage: number
  lastUsageDate: string
  createdAt: string
}

export interface GeneratedDesign {
  id: string
  user_id: string
  business_name: string
  logo_url: string
  slogan: string
  video_url?: string
  merchandise_urls: string[]
  created_at: string
  design_type: 'logo' | 'video' | 'merchandise'
}

export function mapUserProfile(data: any): UserProfile {
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    role: data.role,
    isPro: data.is_pro,
    dailyUsage: data.daily_usage,
    lastUsageDate: data.last_usage_date,
    createdAt: data.created_at,
  };
}

export function mapGeneratedDesign(data: any): GeneratedDesign {
  return {
    id: data.id,
    user_id: data.user_id,
    business_name: data.business_name,
    logo_url: data.logo_url,
    slogan: data.slogan,
    video_url: data.video_url,
    merchandise_urls: data.merchandise_urls || [],
    created_at: data.created_at,
    design_type: data.design_type,
  };
}