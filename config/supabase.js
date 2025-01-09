// config/supabase.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Ambil URL dan KEY dari .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Buat Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
