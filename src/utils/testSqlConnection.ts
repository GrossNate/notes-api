import { Pool } from 'pg';
 
// pools will use environment variables
// for connection information
const pool: Pool = new Pool();
 
// you can also use async/await
async function testConnection() {
  const now = await pool.query('SELECT NOW()');
  console.log(now);
  await pool.end();
}
 
void testConnection();
// // clients will also use environment variables
// // for connection information
// const client = new Client()
// await client.connect()
 
// const res = await client.query('SELECT NOW()')
// await client.end()