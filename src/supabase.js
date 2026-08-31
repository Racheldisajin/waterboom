import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://cijoho-waterboom.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder';

let supabaseClient;
try {
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch (err) {
  console.warn('Failed to initialize Supabase client:', err);
}

if (!supabaseClient) {
  supabaseClient = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null, count: 0 }),
      insert: () => Promise.resolve({ data: [], error: null }),
      update: () => Promise.resolve({ data: [], error: null }),
      delete: () => Promise.resolve({ data: [], error: null })
    })
  };
}

export const supabase = supabaseClient;

// Fungsi keepAlive untuk mencegah idle connection
export const keepAlive = async () => {
  try {
    if (supabase && typeof supabase.from === 'function') {
      const { count, error } = await supabase
        .from('transactions')
        .select('id', { count: 'exact', head: true });
      
      if (error) {
        console.warn('Keep-alive warning:', error.message);
      } else {
        console.log('Keep-alive ping sukses, count:', count);
      }
    }
  } catch (e) {
    console.warn('Keep-alive failed:', e.message);
  }
};