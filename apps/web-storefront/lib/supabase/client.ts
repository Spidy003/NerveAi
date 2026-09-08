import { createBrowserClient } from "@supabase/ssr";

const DEFAULT_SUPABASE_URL = "https://bwhxqugsvbymphiopqpd.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3aHhxdWdzdmJ5bXBoaW9wcXBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4ODA1MTIsImV4cCI6MjEwNDQ1NjUxMn0.XXsgmYoh5s54h9SlMfGun7VZTVh0EnmNzjuKMURKj14";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY
  );
}

