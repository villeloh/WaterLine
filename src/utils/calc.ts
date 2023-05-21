import { LatLng } from 'react-native-maps'

export const kmBetween = (pointA: LatLng, pointB: LatLng) => {
  const radiusOfEarthInKm = 6371
  const latDifference = _toRadians(pointB.latitude - pointA.latitude)
  const longDifference = _toRadians(pointB.longitude - pointA.longitude)

  // Haversine formula
  const a =
    Math.sin(latDifference / 2) * Math.sin(latDifference / 2) +
    Math.cos(_toRadians(pointA.latitude)) *
      Math.cos(_toRadians(pointB.latitude)) *
      Math.sin(longDifference / 2) *
      Math.sin(longDifference / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const distance = radiusOfEarthInKm * c
  return distance.toFixed(1)
}

export const latDeltaToM = (latitudeDelta: number) => {
  const oneDegreeOfLatitudeInM = 110574 // average, as the Earth is not a perfect sphere
  return latitudeDelta * oneDegreeOfLatitudeInM
}

export const longDeltaToM = (longDelta: number, latitude: number) => {
  const radianLat = latitude * (Math.PI / 180) // Convert latitude from degrees to radians
  return Math.abs(111320 * Math.cos(radianLat) * longDelta)
}

const _toRadians = (degrees: number) => {
  return degrees * (Math.PI / 180)
}
