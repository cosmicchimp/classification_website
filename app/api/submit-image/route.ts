// app/api/submit-image/route.js
import InsertScan from "@/app/components/DAO/InsertScan"
export async function POST(req) {
  const scanData =  {
    
  }
  const insertion = await InsertScan(scanData)
  return new Response("Upload successful", { status: 200 })
}