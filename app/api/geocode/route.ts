import { type NextRequest, NextResponse } from "next/server"

// This is a simplified geocoding service for demo purposes
// In a real application, you would use a proper geocoding service like Google Maps, Mapbox, etc.
const mockGeocodingDatabase = {
  "new york": { latitude: 40.7128, longitude: -74.006 },
  "los angeles": { latitude: 34.0522, longitude: -118.2437 },
  chicago: { latitude: 41.8781, longitude: -87.6298 },
  houston: { latitude: 29.7604, longitude: -95.3698 },
  phoenix: { latitude: 33.4484, longitude: -112.074 },
  philadelphia: { latitude: 39.9526, longitude: -75.1652 },
  "san antonio": { latitude: 29.4241, longitude: -98.4936 },
  "san diego": { latitude: 32.7157, longitude: -117.1611 },
  dallas: { latitude: 32.7767, longitude: -96.797 },
  "san francisco": { latitude: 37.7749, longitude: -122.4194 },
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const address = searchParams.get("address")

  if (!address) {
    return NextResponse.json({ error: "Address parameter is required" }, { status: 400 })
  }

  try {
    // Normalize the search term
    const normalizedAddress = address.toLowerCase().trim()

    // Check if we have this location in our mock database
    for (const [key, coords] of Object.entries(mockGeocodingDatabase)) {
      if (normalizedAddress.includes(key)) {
        return NextResponse.json(coords)
      }
    }

    // If not found in our mock database, return a random location near New York
    // In a real app, you would return a proper error or use a real geocoding service
    const randomLat = 40.7128 + (Math.random() - 0.5) * 0.1
    const randomLng = -74.006 + (Math.random() - 0.5) * 0.1

    return NextResponse.json({
      latitude: randomLat,
      longitude: randomLng,
    })
  } catch (error) {
    console.error("Geocoding error:", error)
    return NextResponse.json({ error: "Failed to geocode address" }, { status: 500 })
  }
}
