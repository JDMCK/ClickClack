import 'dotenv/config'
import postgres from 'postgres'
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with database
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)


const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  console.error('❌ DATABASE_URL is not set in the .env file');
  process.exit(1);
}
const sql = postgres(connectionString)

export default sql