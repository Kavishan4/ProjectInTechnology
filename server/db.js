import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL || process.env.DATABASE_URL === 'your_neon_connection_string_here') {
  console.error('\n❌  DATABASE_URL is not set in your .env file!');
  console.error('   Open .env and paste your Neon connection string.\n');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

export default sql;
