"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { School } from "@/types/school"

// Define the API context type
type ApiContextType = {
  fetchSchools: (latitude: number, longitude: number) => Promise<School[]>
  addSchool: (school: { name: string; address: string; latitude: number; longitude: number }) => Promise<any>
}

// Create the context with default implementations
const ApiContext = createContext<ApiContextType>({
  fetchSchools: async () => {
    console.warn("ApiProvider not initialized, using mock data")
    return getMockSchools()
  },
  addSchool: async () => {
    console.warn("ApiProvider not initialized")
    return { success: false, error: "ApiProvider not initialized" }
  },
})

// Mock data for fallback
function getMockSchools(): School[] {
  return [
    {
      id: 1,
      name: "Central High School",
      address: "123 Main St, City Center",
      latitude: 40.7128,
      longitude: -74.006,
      distance: 0.5,
    },
    {
      id: 2,
      name: "Westside Elementary",
      address: "456 Park Ave, West District",
      latitude: 40.73,
      longitude: -74.02,
      distance: 1.2,
    },
    {
      id: 3,
      name: "Eastside Middle School",
      address: "789 Broadway, East District",
      latitude: 40.7,
      longitude: -73.98,
      distance: 1.8,
    },
  ]
}

// Provider component
export function ApiProvider({ children }: { children: ReactNode }) {
  // Implement the actual API methods
  const api: ApiContextType = {
    fetchSchools: async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(`/api/schools?latitude=${latitude}&longitude=${longitude}`)

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        return data.schools || []
      } catch (error) {
        console.error("Error fetching schools:", error)
        // Return mock data as fallback
        return getMockSchools()
      }
    },

    addSchool: async (school) => {
      try {
        const response = await fetch("/api/schools", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(school),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `API error: ${response.status}`)
        }

        return await response.json()
      } catch (error) {
        console.error("Error adding school:", error)
        throw error
      }
    },
  }

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}

// Hook to use the API
export function useApi() {
  return useContext(ApiContext)
}
