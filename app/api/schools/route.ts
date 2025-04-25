import { type NextRequest, NextResponse } from "next/server"
import { mockApiService } from "@/lib/mock-data"

// GET handler for listing schools
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const latitude = searchParams.get("latitude")
  const longitude = searchParams.get("longitude")

  if (!latitude || !longitude) {
    return NextResponse.json({ error: "Latitude and longitude are required" }, { status: 400 })
  }

  try {
    // Use mock data service instead of trying to connect to backend
    const schools = await mockApiService.getSchools(Number.parseFloat(latitude), Number.parseFloat(longitude))

    return NextResponse.json({
      success: true,
      count: schools.length,
      schools: schools,
    })
  } catch (error) {
    console.error("Error fetching schools:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch schools",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// POST handler for adding a school
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "address", "latitude", "longitude"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Use mock data service instead of trying to connect to backend
    const result = await mockApiService.addSchool({
      name: body.name,
      address: body.address,
      latitude: Number.parseFloat(body.latitude),
      longitude: Number.parseFloat(body.longitude),
    })

    return NextResponse.json({
      success: true,
      message: "School added successfully",
      schoolId: result.schoolId,
    })
  } catch (error) {
    console.error("Error adding school:", error)
    return NextResponse.json(
      {
        error: "Failed to add school",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
