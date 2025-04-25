import type { School } from "@/types/school"

// Mock schools data
const mockSchools: School[] = [
  {
    id: 1,
    name: "Central High School",
    address: "123 Main St, City Center",
    latitude: 40.7128,
    longitude: -74.006,
    distance: 0,
  },
  {
    id: 2,
    name: "Westside Elementary",
    address: "456 Park Ave, West District",
    latitude: 40.73,
    longitude: -74.02,
    distance: 0,
  },
  {
    id: 3,
    name: "Eastside Middle School",
    address: "789 Broadway, East District",
    latitude: 40.7,
    longitude: -73.98,
    distance: 0,
  },
  {
    id: 4,
    name: "North County Academy",
    address: "101 North Rd, North District",
    latitude: 40.75,
    longitude: -74.01,
    distance: 0,
  },
  {
    id: 5,
    name: "South Bay School",
    address: "202 South St, South District",
    latitude: 40.69,
    longitude: -74.0,
    distance: 0,
  },
]

// Calculate distance between two coordinates using the Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // Distance in km
  return d
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180)
}

// Mock API service
export const mockApiService = {
  // Get schools sorted by distance from a location
  getSchools: (latitude: number, longitude: number): Promise<School[]> => {
    return new Promise((resolve) => {
      // Add a small delay to simulate network request
      setTimeout(() => {
        // Calculate distance for each school and sort by distance
        const schoolsWithDistance = mockSchools.map((school) => ({
          ...school,
          distance: calculateDistance(latitude, longitude, school.latitude, school.longitude),
        }))

        // Sort by distance
        schoolsWithDistance.sort((a, b) => a.distance - b.distance)

        resolve(schoolsWithDistance)
      }, 500)
    })
  },

  // Add a new school
  addSchool: (school: Omit<School, "id" | "distance">): Promise<{ success: boolean; schoolId: number }> => {
    return new Promise((resolve) => {
      // Add a small delay to simulate network request
      setTimeout(() => {
        // Generate a new ID
        const newId = Math.max(...mockSchools.map((s) => s.id)) + 1

        // Add the new school to the mock data
        mockSchools.push({
          ...school,
          id: newId,
          distance: 0,
        })

        resolve({ success: true, schoolId: newId })
      }, 500)
    })
  },
}
