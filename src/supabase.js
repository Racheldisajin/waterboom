import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://cijoho-waterboom.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpam9oby13YXRlcmJvb20iLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYwMDAwMDAwMCwiZXhwIjoyMDAwMDAwMDAwfQ.placeholder';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Fungsi keepAlive untuk mencegah idle connection
export const keepAlive = async () => {
  try {
    const { count, error } = await supabase
      .from('transactions')
      .select('id', { count: 'exact', head: true });
    
    if (error) {
      console.warn('Keep-alive error:', error.message);
    } else {
      console.log('Keep-alive ping sukses, count:', count);
    }
  } catch (e) {
    console.warn('Keep-alive failed:', e.message);
  }
};