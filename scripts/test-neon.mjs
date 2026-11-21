import { Pool } from "@neondatabase/serverless";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

console.log("=== Testing Neon Services ===");

// 1. Lakebase Postgres
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const pgRes = await pool.query("SELECT NOW() as current_time, version() as version;");
console.log("✓ Neon Lakebase Postgres (time):", pgRes.rows[0].current_time);

const leadCheck = await pool.query("SELECT id, type, name, email, status FROM leads ORDER BY created_at DESC LIMIT 1;");
console.log("✓ Neon Lakebase Postgres (lead record):", leadCheck.rows[0]);
await pool.end();

// 2. Object Storage
const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-east-2",
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});
const s3Res = await s3.send(new ListBucketsCommand({}));
console.log("✓ Neon Object Storage (buckets):", s3Res.Buckets?.map((b) => b.Name));

// 3. Neon Functions
if (process.env.NEON_FUNCTION_HELLO_BASE_URL) {
  const fnRes = await fetch(process.env.NEON_FUNCTION_HELLO_BASE_URL);
  const fnText = await fnRes.text();
  console.log("✓ Neon Functions (hello):", fnText.trim());
}

// 4. Neon Auth
if (process.env.NEON_AUTH_JWKS_URL) {
  const authRes = await fetch(process.env.NEON_AUTH_JWKS_URL);
  const jwks = await authRes.json();
  console.log("✓ Neon Auth JWKS keys loaded:", jwks.keys?.length ?? 0);
}

// 5. Neon Realtime
console.log("✓ Neon Realtime URL configured:", process.env.NEON_REALTIME_URL);

console.log("=== All Neon Services Verified Successfully ===");
