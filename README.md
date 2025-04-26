# School Management System

This is a frontend application for the School Management System. It allows users to view schools, add new schools, and see schools sorted by proximity to a specified location.

## Demo Mode

By default, the application runs in demo mode with mock data. This allows you to preview and test the application without a backend connection.

## Connecting to a Real Backend

To connect this frontend to your Node.js backend API:

1. Make sure your backend API is running and accessible
2. Update the API routes in `app/api/schools/route.ts` to connect to your backend API
3. Set the `API_HOST` and `PORT` environment variables to point to your backend

### Example Backend Connection

\`\`\`typescript
// In app/api/schools/route.ts

// Replace the mock service with real API calls
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const latitude = searchParams.get("latitude")
  const longitude = searchParams.get("longitude")

  if (!latitude || !longitude) {
    return NextResponse.json({ error: "Latitude and longitude are required" }, { status: 400 })
  }

  try {
    // Connect to your backend API
    const apiUrl = `http://${process.env.API_HOST || 'localhost'}:${process.env.PORT || 3000}/listSchools?latitude=${latitude}&longitude=${longitude}`
    
    const response = await fetch(apiUrl)
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching schools:', error)
    return NextResponse.json(
      { error: 'Failed to fetch schools' },
      { status: 500 }
    )
  }
}
\`\`\`

## Features

1. **School Listing**:
   - View all schools sorted by proximity to a specified location
   - Each school card shows name, address, and distance from the current location

2. **Add New Schools**:
   - Form with validation for adding new schools
   - Real-time error feedback

3. **Location Search**:
   - Search for locations by name
   - Use current location button that uses the browser's geolocation API
   - Schools automatically update when location changes

4. **Responsive Design**:
   - Works well on both mobile and desktop devices
   - Sidebar with statistics on larger screens
   Sidebar with statistics on larger screens
