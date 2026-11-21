import { Pool } from "@neondatabase/serverless";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

await pool.query("DROP TABLE IF EXISTS leads CASCADE;");
console.log("✓ Dropped conflicting manual leads table so Payload can generate its schema cleanly.");

await pool.end();
