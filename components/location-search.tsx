"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface LocationSearchProps {
  onLocationChange: (latitude: number, longitude: number) => void
}

// Mock geocoding data for demo purposes
const mockLocations: Record<string, { lat: number; lng: number }> = {
  "new york": { lat: 40.7128, lng: -74.006 },
  "los angeles": { lat: 34.0522, lng: -118.2437 },
  chicago: { lat: 41.8781, lng: -87.6298 },
  houston: { lat: 29.7604, lng: -95.3698 },
  phoenix: { lat: 33.4484, lng: -112.074 },
  philadelphia: { lat: 39.9526, lng: -75.1652 },
  "san antonio": { lat: 29.4241, lng: -98.4936 },
  "san diego": { lat: 32.7157, lng: -117.1611 },
  dallas: { lat: 32.7767, lng: -96.797 },
  "san francisco": { lat: 37.7749, lng: -122.4194 },
  austin: { lat: 30.2672, lng: -97.7431 },
  seattle: { lat: 47.6062, lng: -122.3321 },
  denver: { lat: 39.7392, lng: -104.9903 },
  boston: { lat: 42.3601, lng: -71.0589 },
  miami: { lat: 25.7617, lng: -80.1918 },
}

export default function LocationSearch({ onLocationChange }: LocationSearchProps) {
  const [searchInput, setSearchInput] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchInput.trim()) return

    setIsSearching(true)
    setError(null)

    // Simple mock geocoding
    const normalizedInput = searchInput.toLowerCase().trim()

    // Try to find a match in our mock data
    let found = false
    for (const [key, location] of Object.entries(mockLocations)) {
      if (normalizedInput.includes(key) || key.includes(normalizedInput)) {
        onLocationChange(location.lat, location.lng)
        found = true
        break
      }
    }

    if (!found) {
      // If no exact match, generate a random location near New York
      const randomLat = 40.7128 + (Math.random() - 0.5) * 0.1
      const randomLng = -74.006 + (Math.random() - 0.5) * 0.1
      onLocationChange(randomLat, randomLng)
    }

    setIsSearching(false)
  }

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsSearching(true)
      setError(null)

      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationChange(position.coords.latitude, position.coords.longitude)
          setIsSearching(false)
        },
        (err) => {
          console.error("Geolocation error:", err)
          setError("Could not get your current location. Please allow location access or enter a location manually.")
          setIsSearching(false)
        },
      )
    } else {
      setError("Geolocation is not supported by your browser")
    }
  }

  return (
    <div className="space-y-2">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search for a location..."
            className="pl-9"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            disabled={isSearching}
          />
        </div>
        <Button type="submit" disabled={isSearching || !searchInput.trim()}>
          {isSearching ? "Searching..." : "Search"}
        </Button>
        <Button type="button" variant="outline" onClick={handleUseCurrentLocation} disabled={isSearching}>
          My Location
        </Button>
      </form>

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}
