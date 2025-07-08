import { supabase } from '../lib/supabase';

export async function checkAndIncrementIpLimit(ip: string, maxLimit: number): Promise<boolean> {
  const { data, error } = await supabase.rpc('check_and_increment_ip_limit', {
    ip_address: ip,
    max_limit: maxLimit,
  });
  if (error) throw error;
  return data;
} 