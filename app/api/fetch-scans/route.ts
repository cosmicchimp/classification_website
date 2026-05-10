import PullScans from "@/app/components/DAO/PullScans"
export async function POST(req: Request) {
  const scanData = await req.json()
  console.log("SCAN DATA ID:   ", scanData.ID)
  const query = await PullScans({ID:scanData.ID})
  if (!query) {
    return Response.json("Database query failed", { status: 200 })
  }
  return Response.json({data:{query}}, { status: 200 })
}