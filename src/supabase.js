// Safe Supabase Client Initializer with Dynamic Import & Fallback Mock
let createClientFunc = null;

try {
  const supabaseModule = await import('@supabase/supabase-js');
  createClientFunc = supabaseModule.createClient;
} catch (e) {
  console.warn('Supabase module dynamically fallback mode active.');
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://cijoho-waterboom.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder';

const createMockClient = () => ({
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null, count: 0 }),
    insert: () => Promise.resolve({ data: [], error: null }),
    update: () => Promise.resolve({ data: [], error: null }),
    delete: () => Promise.resolve({ data: [], error: null })
  })
});

export const supabase = (createClientFunc && SUPABASE_URL) 
  ? createClientFunc(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : createMockClient();

export const keepAlive = async () => {
  try {
    if (supabase && typeof supabase.from === 'function') {
      const { count, error } = await supabase
        .from('transactions')
        .select('id', { count: 'exact', head: true });
      
      if (error) {
        console.warn('Keep-alive warning:', error.message);
      } else {
        console.log('Keep-alive ping success, count:', count);
      }
    }
  } catch (e) {
    console.warn('Keep-alive failed:', e.message);
  }
};