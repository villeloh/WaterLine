import { LatLng } from 'react-native-maps'

export const metersBetween = (pointA: LatLng, pointB: LatLng) => {
  const radiusOfEarthInM = 6371000
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

  return radiusOfEarthInM * c
}

export const latDeltaToScreenM = (longDelta: number, latDelta: number) => {
  const angleRatio = longDelta / latDelta // 1.05 when phone is upright; 4.00 when it's horizontal
  const multiplier = 0.1695 * angleRatio + 0.322025
  const mysteryFactor = 0.9 // gives correct horizontal scale value; vertical is off by ~7 %

  const oneDegreeOfLatitudeInM = 110574 // average, as the Earth is not a perfect sphere
  return latDelta * oneDegreeOfLatitudeInM * multiplier * mysteryFactor
}

const _toRadians = (degrees: number) => {
  return degrees * (Math.PI / 180)
}
