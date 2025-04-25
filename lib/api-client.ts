// API client for direct communication with the backend

// Helper function to get the backend API URL
function getBackendUrl() {
  // In the browser, we need to use relative URLs or the full URL from environment variables
  if (typeof window !== "undefined") {
    // When running in the browser, use a relative URL
    return "/api"
  }

  // When running on the server, use the full URL from environment variables
  const host = process.env.API_HOST || "localhost"
  const port = process.env.PORT || 3000
  return `http://${host}:${port}`
}

export async function fetchSchools(latitude: number, longitude: number) {
  try {
    const response = await fetch(`${getBackendUrl()}/schools?latitude=${latitude}&longitude=${longitude}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching schools:", error)
    throw error
  }
}

export async function addSchool(schoolData: {
  name: string
  address: string
  latitude: number
  longitude: number
}) {
  try {
    const response = await fetch(`${getBackendUrl()}/schools`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(schoolData),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error adding school:", error)
    throw error
  }
}
