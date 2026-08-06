import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validasi: pastikan environment variables tersedia
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Supabase credentials tidak ditemukan di .env!');
  console.error('Pastikan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY sudah di-set.');
}

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