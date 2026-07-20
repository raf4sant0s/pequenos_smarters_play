// src/services/supabase.js
import 'react-native-url-polyfill/auto'; // corrige o Supabase no React Native
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dlfsthhuddxapefhbwql.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_oyjuLKVhxsMePjy_d_amtA_GzqTvBC-';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        storage: AsyncStorage,     // lembra o login mesmo fechando o app
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false, // no celular não usamos link de sessão
    },
});