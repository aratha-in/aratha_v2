import pg from 'pg';

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

const tables = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name");
console.log('Tables count:', tables.rows.length);
for (const r of tables.rows) {
  try {
    const count = await client.query(`SELECT count(*) FROM "${r.table_name}"`);
    console.log(`${r.table_name}: ${count.rows[0].count} rows`);
  } catch (err) {
    console.log(`${r.table_name}: err ${err.message}`);
  }
}

// Check users specifically
try {
  const users = await client.query('SELECT id, email, role, created_at FROM users');
  console.log('Users in users table:', users.rows);
} catch (e) {
  console.log('Error reading users:', e.message);
}

await client.end();
