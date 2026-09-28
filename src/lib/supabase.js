import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () => {
  return (
    supabaseUrl &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project-id') &&
    supabaseAnonKey &&
    !supabaseAnonKey.includes('your-supabase-anon')
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// LocalStorage fallback for seamless preview
const LOCAL_WISHES_KEY = 'mohamed_samar_wishes_react';

export const getLocalWishes = () => {
  try {
    const data = localStorage.getItem(LOCAL_WISHES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.warn('LocalStorage read error:', err);
    return [];
  }
};

export const saveLocalWish = (wish) => {
  try {
    const list = getLocalWishes();
    list.unshift(wish);
    localStorage.setItem(LOCAL_WISHES_KEY, JSON.stringify(list));
    return list;
  } catch (err) {
    console.warn('LocalStorage save error:', err);
    return [];
  }
};
