import pg from 'pg';

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

const cols = await client.query(
  "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'leads' ORDER BY ordinal_position"
);
console.log('Leads columns count:', cols.rows.length);
console.log(cols.rows.map(c => `${c.column_name} (${c.data_type})`).join(', '));

await client.end();
