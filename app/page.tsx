"use client"

import { useState, useEffect } from "react"
import type { School } from "@/types/school"
import SchoolList from "@/components/school-list"
import AddSchoolForm from "@/components/add-school-form"
import LocationSearch from "@/components/location-search"
import { MapPin } from "lucide-react"

export default function HomePage() {
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState({ latitude: 40.7128, longitude: -74.006 })
  const [showAddForm, setShowAddForm] = useState(false)
  const [isDemo, setIsDemo] = useState(false)

  const fetchSchools = async () => {
    try {
      setLoading(true)

      // Add a timestamp to prevent caching
      const timestamp = new Date().getTime()
      const response = await fetch(
        `/api/schools?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&_=${timestamp}`,
      )

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      if (data.schools && Array.isArray(data.schools)) {
        setSchools(data.schools)
        setIsDemo(true) // We're using mock data
      } else {
        throw new Error("Invalid response format")
      }

      setError(null)
    } catch (err) {
      console.error("Error loading schools:", err)
      setError("Error loading schools. Please try again later.")
      setSchools([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSchools()
  }, [userLocation])

  const handleSchoolAdded = () => {
    fetchSchools()
    setShowAddForm(false)
  }

  const handleLocationChange = (lat: number, lng: number) => {
    setUserLocation({ latitude: lat, longitude: lng })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">School Management System</h1>
        <p className="text-gray-600">Find and manage schools in your area</p>
        {isDemo && (
          <div className="mt-2 bg-blue-50 text-blue-700 p-2 rounded-md text-sm">
            Demo Mode: Using simulated data. Connect to a real backend for production use.
          </div>
        )}
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Schools Near You</h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                {showAddForm ? "Cancel" : "Add School"}
              </button>
            </div>

            <LocationSearch onLocationChange={handleLocationChange} />

            {showAddForm && (
              <div className="mt-6 p-4 border border-gray-200 rounded-md bg-gray-50">
                <h3 className="text-lg font-medium mb-4">Add New School</h3>
                <AddSchoolForm onSchoolAdded={handleSchoolAdded} />
              </div>
            )}

            {userLocation && (
              <div className="flex items-center mt-4 text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>
                  Showing schools near: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
                </span>
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          ) : (
            <SchoolList schools={schools} userLocation={userLocation} />
          )}
        </div>

        <div className="w-full md:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">School Statistics</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">Total Schools</p>
                <p className="text-2xl font-bold">{schools.length}</p>
              </div>

              {schools.length > 0 && (
                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600">Closest School</p>
                  <p className="text-lg font-medium">{schools[0]?.name}</p>
                  <p className="text-sm text-gray-500">{(schools[0]?.distance || 0).toFixed(2)} km away</p>
                </div>
              )}

              <div className="p-4 bg-green-50 rounded-md">
                <p className="text-sm text-gray-600">Quick Tips</p>
                <ul className="text-sm list-disc list-inside space-y-1 mt-2">
                  <li>Click on a school to see more details</li>
                  <li>Use the search box to find a specific location</li>
                  <li>Add new schools using the Add School button</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
