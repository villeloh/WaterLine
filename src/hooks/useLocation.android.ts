import { useEffect, useRef, useState } from 'react'
import { PermissionsAndroid, Platform } from 'react-native'
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service'

type UseLocationReturnType = [
  location: GeoCoordinates | null,
  start: () => number,
  stop: () => void,
  isActive: boolean,
]

// TODO: not sure if I'm doing everything correctly
// TODO: weird issue where sometimes manual reorientation doesn't work
const useLocation = (): UseLocationReturnType => {
  const [location, setLocation] = useState<GeoCoordinates | null>(null)
  const [isActive, setIsActive] = useState(true)
  const watchId = useRef(0)

  useEffect(() => {
    if (Platform.OS === 'android') {
      _requestLocPermission()
    }
    watchId.current = start()
    return () => {
      if (watchId?.current !== 0) {
        Geolocation.clearWatch(watchId.current)
        // Geolocation.stopObserving() // gives an annoying warning in dev mode
      }
    }
  }, [])

  const start = () => {
    return Geolocation.watchPosition(
      (position) => {
        setLocation(position.coords)
        setIsActive(true)
        console.log('Position:', position.coords)
      },
      (error) => {
        if (error.code === 2) {
          console.log(error)
        }
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 5000,
        forceRequestLocation: true,
        showLocationDialog: false,
      },
    )
  }

  const stop = () => {
    Geolocation.clearWatch(watchId.current)
    // Geolocation.stopObserving()
    setIsActive(false)
  }

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
