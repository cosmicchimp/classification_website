export const runtime = 'nodejs'

import ReadAccount from '@/app/components/DAO/ReadAccount'

export async function POST(req: Request) {
  try {
    const userInfo = await req.json()
    const value = await ReadAccount({
      userInfo: userInfo
    })
    if (value) {
      console.log("Log in successful")
      return Response.json({success:true}, {status:200})
    }
    else {
      console.log("Log in failed")
      return Response.json({success:false, message:"Incorrect password"}, {status:200})

    }
  } catch (error) {
    console.error('read-account error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}    