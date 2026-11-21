import { Pool, neon } from "@neondatabase/serverless";
import { S3Client, ListBucketsCommand, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

// 1. Lakebase Postgres Client & Pool
export function getNeonSql() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  return neon(connectionString);
}

let cachedPool: Pool | null = null;
export function getNeonPool(): Pool {
  if (cachedPool) return cachedPool;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  cachedPool = new Pool({ connectionString });
  return cachedPool;
}

// 2. Neon Object Storage (S3-compatible)
let cachedS3: S3Client | null = null;
export function getNeonStorageClient(): S3Client {
  if (cachedS3) return cachedS3;
  const endpoint = process.env.AWS_ENDPOINT_URL_S3;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION || "us-east-2";

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error("Neon Object Storage environment variables are not configured");
  }

  cachedS3 = new S3Client({
    region,
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    forcePathStyle: true,
  });

  return cachedS3;
}

// 3. Neon Serverless Functions Invoker
export async function invokeNeonFunction(
  functionName: string,
  pathname: string = "",
  options: RequestInit = {}
): Promise<Response> {
  const envVarName = `NEON_FUNCTION_${functionName.toUpperCase()}_BASE_URL`;
  const baseUrl = process.env[envVarName];

  if (!baseUrl) {
    throw new Error(`Base URL for Neon Function "${functionName}" is not configured (${envVarName})`);
  }

  const url = new URL(pathname, baseUrl).toString();
  return fetch(url, options);
}

// 4. Neon Auth Helpers
export function getNeonAuthConfig() {
  return {
    baseUrl: process.env.NEON_AUTH_BASE_URL || "",
    jwksUrl: process.env.NEON_AUTH_JWKS_URL || "",
  };
}

// 5. Neon Realtime Config
export function getNeonRealtimeConfig() {
  return {
    url: process.env.NEON_REALTIME_URL || "",
    secret: process.env.NEON_REALTIME_SECRET || "",
  };
}
