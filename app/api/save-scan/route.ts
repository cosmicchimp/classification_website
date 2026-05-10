// app/api/submit-image/route.js
import InsertScan from "@/app/components/DAO/InsertScan"
export async function POST(req: Request) {
  const scanData = await req.json()
  const insertion = await InsertScan({result:scanData.result, confidence:scanData.confidence, ID:scanData.ID})
  if (!insertion) {
    return Response.json("Upload failed", { status: 200 })
  }
  return Response.json("Upload successful", { status: 200 })
}