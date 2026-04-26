import { hash } from 'bcryptjs'
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

export default async function InsertScan(props: {
  scanInfo: { result: string; confidence: string; scan_creator:string; }
}) {
  const insertion = await sql`INSERT INTO scans (result, confidence, scan_creator) VALUES(${props.scanInfo.result}, ${props.scanInfo.confidence} ${props.scanInfo.scan_creator})`
}