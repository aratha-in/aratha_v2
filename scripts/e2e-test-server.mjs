import { spawn } from "child_process";

console.log("Starting Next.js production server on port 3005...");
const nextServer = spawn("npx", ["next", "start", "-p", "3005"], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

// Wait 4 seconds for server to boot
await new Promise((resolve) => setTimeout(resolve, 4000));

try {
  console.log("\nProbing http://localhost:3005/api/neon ...");
  const res = await fetch("http://localhost:3005/api/neon");
  const data = await res.json();
  console.log("\n=== NEON INTEGRATION END-TO-END VERIFICATION ===");
  console.log(JSON.stringify(data, null, 2));

  console.log("\nProbing Lead insertion test into Neon Postgres...");
  const leadRes = await fetch("http://localhost:3005/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "contact",
      name: "Neon Test Lead",
      email: "neon.test@aratha.in",
      message: "Testing end-to-end integration with Neon Lakebase Postgres",
    }),
  });
  const leadData = await leadRes.json();
  console.log("Lead created:", leadData);
} catch (err) {
  console.error("Test failed:", err);
} finally {
  console.log("\nStopping server...");
  nextServer.kill("SIGTERM");
  process.exit(0);
}
