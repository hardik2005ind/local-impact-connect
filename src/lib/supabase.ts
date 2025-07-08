
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://wpxujnzhapnvnxtewfpw.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndweHVqbnpoYXBudm54dGV3ZnB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MjkzNDEsImV4cCI6MjA2NzUwNTM0MX0.wsLXC1xfNFi3t-YEO6c9JJyXprYm5SB2wBKnXbzwF9g";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
