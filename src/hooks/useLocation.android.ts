import { useEffect, useState } from 'react'
import { PermissionsAndroid, Platform } from 'react-native'
import Geolocation, {
  GeoCoordinates,
  clearWatch,
  stopObserving,
} from 'react-native-geolocation-service'

type UseLocationReturnType = [
  location: GeoCoordinates | null,
  start: () => number,
  stop: () => void,
  isActive: boolean,
]

const useLocation = (): UseLocationReturnType => {
  const [location, setLocation] = useState<GeoCoordinates | null>(null)
  const [isActive, setIsActive] = useState(true)

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
          // TODO: print a msg about location error
          /*           PERMISSION_DENIED 	1 	Location permission is not granted
POSITION_UNAVAILABLE 	2 	Location provider not available
TIMEOUT 	3 	Location request timed out
PLAY_SERVICE_NOT_AVAILABLE 	4 	Google play service is not installed or has an older version (android only)
SETTINGS_NOT_SATISFIED 	5 	Location service is not enabled or location mode is not appropriate for the current request (android only)
INTERNAL_ERROR 	-1 	Library crashed for some reason or the getCurrentActivity() returned null (android only) */
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
    stopObserving()
    setIsActive(false)
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      _requestLocPermission()
    }
    const watchId = start()
    return clearWatch(watchId)
  }, [])
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
