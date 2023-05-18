import { useEffect, useRef, useState } from 'react'
import { PermissionsAndroid, Platform } from 'react-native'
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service'

type UseLocationProps = boolean

type UseLocationReturnType = [
  location: GeoCoordinates | null,
  start: () => (() => void) | null,
  stop: () => void,
  isActive: boolean,
]

// TODO: not sure if I'm doing everything correctly
// TODO: weird issue where sometimes manual reorientation doesn't work
const useLocation = (
  enabled: UseLocationProps = true,
): UseLocationReturnType => {
  const [location, setLocation] = useState<GeoCoordinates | null>(null)
  const [isActive, setIsActive] = useState(enabled)
  const watchId = useRef<number | null>(null)

  const start = () => {
    if (!enabled || watchId.current !== null) return null

    setIsActive(true)

    const id = Geolocation.watchPosition(
      (position) => {
        console.log('POSITION: ', position)
        setLocation(position.coords)
      },
      (error) => {
        console.log(error)
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0, // distance in meters before a new location update
        interval: 5000,
        fastestInterval: 5000,
        forceRequestLocation: true,
        showLocationDialog: false,
      },
    )
    watchId.current = id
    return stop
  }

  const stop = () => {
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current)
      watchId.current = null
      setIsActive(false)
      // Geolocation.stopObserving() // gives an annoying warning in dev mode
    }
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      _requestLocPermission()
    }
    start()
    return stop
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return [location, start, stop, isActive]
}

async function _requestLocPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app needs access to your location',
        buttonPositive: 'OK',
      },
    )
    return granted === PermissionsAndroid.RESULTS.GRANTED
  } catch (err) {
    console.warn(err)
    return false
  }
}

export default useLocation
