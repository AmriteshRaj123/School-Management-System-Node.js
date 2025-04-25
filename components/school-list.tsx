"use client"

import type { School } from "@/types/school"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation } from "lucide-react"

interface SchoolListProps {
  schools: School[]
  userLocation: { latitude: number; longitude: number }
}

export default function SchoolList({ schools, userLocation }: SchoolListProps) {
  if (schools.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
        No schools found in this area. Try a different location or add a new school.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {schools.map((school) => (
        <Card key={school.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{school.name}</CardTitle>
              <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                <Navigation className="h-3 w-3 mr-1" />
                {school.distance ? `${school.distance.toFixed(2)} km` : "N/A"}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>{school.address}</span>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              Coordinates: {school.latitude.toFixed(4)}, {school.longitude.toFixed(4)}
            </div>
            <div className="mt-4 flex justify-end">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${school.latitude},${school.longitude}&origin=${userLocation.latitude},${userLocation.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                <Navigation className="h-3 w-3 mr-1" />
                Get Directions
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
