export interface School {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
  distance?: number
}

export interface SchoolFormData {
  name: string
  address: string
  latitude: number | string
  longitude: number | string
}
