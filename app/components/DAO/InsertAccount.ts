import { hash } from 'bcryptjs'
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

export default async function InsertAccount(props: {
  userInfo: { email: string; password: string }
}) {
  const hashPass = await hash(props.userInfo.password, 10)
  const insertion = await sql`INSERT INTO users (email, password) VALUES(${props.userInfo.email}, ${hashPass})`
}