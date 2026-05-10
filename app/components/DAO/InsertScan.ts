import { hash } from 'bcryptjs'
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);
export default async function InsertScan(props: {result: string; confidence: string, ID:number}
) {
  const insertion = await sql`INSERT INTO scans (result, confidence, creator_id) VALUES(${props.result}, ${props.confidence}, ${props.ID})`
  if (insertion) {
    return true
  }
  else {
    return false
  }
}