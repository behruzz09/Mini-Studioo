import { useState, useEffect } from 'react'
import { UserProfile } from '../lib/supabase'

export function useDailyLimit(profile: UserProfile | null) {
  const [dailyLimit, setDailyLimit] = useState(3)
  const [remainingUsage, setRemainingUsage] = useState(0)

  useEffect(() => {
    if (!profile) return

    let limit = 3 // Default free tier
    
    if (profile.isPro) {
      limit = 50 // Pro agent
    } else if (profile.role === 'freelancer') {
      limit = 10 // Freelancer
    }

    setDailyLimit(limit)

    // Check if usage is from today
    const today = new Date().toISOString().split('T')[0]
    const lastUsageDate = profile.lastUsageDate ? profile.lastUsageDate.split('T')[0] : null
    
    if (lastUsageDate === today) {
      setRemainingUsage(Math.max(0, limit - profile.dailyUsage))
    } else {
      setRemainingUsage(limit)
    }
  }, [profile])

  const canGenerate = remainingUsage > 0

  const updateUsage = () => {
    if (remainingUsage > 0) {
      setRemainingUsage(prev => prev - 1)
    }
  }

  return {
    dailyLimit,
    remainingUsage,
    canGenerate,
    updateUsage
  }
}