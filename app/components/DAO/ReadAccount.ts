import { hash, compare } from 'bcryptjs'
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

export default async function ReadAccount(props: {
  userInfo: { email: string; password: string }
}) {
  let user
  let select = await sql`SELECT * FROM users WHERE email = ${props.userInfo.email}`
  if (select[0]) {
    user = select[0]
    let passwordValidity = await compare(props.userInfo.password, user.password)
    const userInfo = {valid:passwordValidity, username:props.userInfo.email}
    return userInfo
}
}