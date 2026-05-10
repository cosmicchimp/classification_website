import { hash } from 'bcryptjs'
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);
export default async function InsertScan(props: {ID:number}
) {
    console.log("PROP ID: ", props.ID)
  const query = await sql`SELECT * from scans WHERE creator_id = (${props.ID})`
  if (query) {
    console.log("QUERY PULLED: ", query)
    return query
  }
  else {
    return false
  }
}