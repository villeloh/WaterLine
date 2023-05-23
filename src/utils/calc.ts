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

// TODO: make it work with intermediate angles somehow
export const latDeltaToScreenM = (longDelta: number, latDelta: number) => {
  let angleRatio = longDelta / latDelta // 1.05 when phone is upright; 3.86 when it's horizontal
  angleRatio = angleRatio / 2.1 // adjust for Mercator distortion
  console.log(angleRatio)
  if (angleRatio > 1.6) {
    angleRatio = angleRatio / 2 // dirty hack to give correct display value when horizontal
  }

  const oneDegreeOfLatitudeInM = 110574 // average, as the Earth is not a perfect sphere
  return latDelta * oneDegreeOfLatitudeInM * angleRatio
}

/*
export const longDeltaToM = (
  longDelta: number,
  latDelta: number,
  latitude: number,
) => {
  const radianLat = latitude * (Math.PI / 180) // Convert latitude from degrees to radians

  const ratio = longDelta / latDelta // 0.5 when phone is upright; 2.0 when it's horizontal

  // the map's orientation (relative to the phone screen) affects things
  const portraitRatio = 1
  const landscapeRatio = 2
  const currentRatio =
    portraitRatio + (landscapeRatio - portraitRatio) * (adjustedAngle / 90.0)

  const correctedLongDelta = longDelta * currentRatio

  return Math.abs(111320 * Math.cos(radianLat) * correctedLongDelta)
} */

const _toRadians = (degrees: number) => {
  return degrees * (Math.PI / 180)
}
