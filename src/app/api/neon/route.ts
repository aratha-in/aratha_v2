import { NextResponse } from "next/server";
import { getNeonSql, getNeonStorageClient, invokeNeonFunction, getNeonAuthConfig, getNeonRealtimeConfig } from "@/lib/neon";
import { ListBucketsCommand } from "@aws-sdk/client-s3";

export async function GET() {
  const results: Record<string, any> = {
    timestamp: new Date().toISOString(),
    branch: process.env.NEON_BRANCH || "production",
    services: {},
  };

  // 1. Lakebase Postgres
  try {
    const sql = getNeonSql();
    const pgRes = await sql`SELECT NOW() as current_time, version() as version;`;
    results.services.postgres = {
      status: "connected",
      currentTime: pgRes[0]?.current_time,
      version: pgRes[0]?.version,
    };
  } catch (error: any) {
    results.services.postgres = {
      status: "error",
      message: error.message,
    };
  }

  // 2. Object Storage
  try {
    const s3 = getNeonStorageClient();
    const s3Res = await s3.send(new ListBucketsCommand({}));
    results.services.objectStorage = {
      status: "connected",
      buckets: s3Res.Buckets?.map((b) => b.Name) || [],
    };
  } catch (error: any) {
    results.services.objectStorage = {
      status: "error",
      message: error.message,
    };
  }

  // 3. Neon Function
  try {
    const fnRes = await invokeNeonFunction("hello");
    const fnText = await fnRes.text();
    results.services.functions = {
      status: "connected",
      helloResponse: fnText.trim(),
    };
  } catch (error: any) {
    results.services.functions = {
      status: "error",
      message: error.message,
    };
  }

  // 4. Neon Auth
  try {
    const authConfig = getNeonAuthConfig();
    if (authConfig.jwksUrl) {
      const res = await fetch(authConfig.jwksUrl);
      const jwks = await res.json();
      results.services.auth = {
        status: "configured",
        baseUrl: authConfig.baseUrl,
        keyCount: jwks.keys?.length ?? 0,
      };
    } else {
      results.services.auth = {
        status: "missing_config",
      };
    }
  } catch (error: any) {
    results.services.auth = {
      status: "error",
      message: error.message,
    };
  }

  // 5. Realtime
  const rtConfig = getNeonRealtimeConfig();
  results.services.realtime = {
    status: rtConfig.url ? "configured" : "missing_config",
    url: rtConfig.url,
  };

  return NextResponse.json(results);
}
