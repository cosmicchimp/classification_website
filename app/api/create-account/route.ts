export const runtime = 'nodejs'

import InsertAccount from '@/app/components/DAO/InsertAccount'

export async function POST(req: Request) {
  try {
    const userInfo = await req.json()
    const value = await InsertAccount({
      userInfo: userInfo
    })
    return Response.json({success:true}, {status:200})
  } catch (error) {
    console.error('create-account error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}  