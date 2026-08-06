import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tqojiqktzxjxjmowgqxb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxb2ppcWt0enhqeGptb3dncXhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1MzA5NjAsImV4cCI6MjEwMDEwNjk2MH0.ee7NIxlmzekgVO0QvZrso7csMxIiK1SRDlFvafShwMA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Fungsi keepAlive untuk mencegah idle connection
export const keepAlive = async () => {
  try {
    // Query ringan: hitung jumlah baris tanpa mengambil data
    const { count, error } = await supabase
      .from('transactions')
      .select('id', { count: 'exact', head: true });
    
    if (error) {
      console.warn('Keep-alive error:', error.message);
    } else {
      console.log('Keep-alive ping sukses, count:', count);
    }
  } catch (e) {
    // Abaikan error agar tidak mengganggu aplikasi
    console.warn('Keep-alive failed:', e.message);
  }
};