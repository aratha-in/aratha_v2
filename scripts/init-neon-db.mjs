import { Pool } from "@neondatabase/serverless";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

await pool.query(`
  CREATE TABLE IF NOT EXISTS leads (
    id VARCHAR(64) PRIMARY KEY,
    type VARCHAR(32) NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(64),
    job_title VARCHAR(255),
    experience TEXT,
    message TEXT,
    status VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`);

console.log("✓ Leads table created / verified in Neon Postgres!");
await pool.end();
