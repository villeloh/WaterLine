import { useEffect, useRef, useState } from 'react'
import { PermissionsAndroid, Platform } from 'react-native'
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service'
import useAppState from './useAppState.android'
import { useData } from './useData.android'
import { Setting as S } from '@/state/Repository'
import { LocUpdateDistance, LocUpdateInterval } from '@/AppConstants'

type UseLocationProps = boolean

type UseLocationReturnType = [
  location: GeoCoordinates | null,
  start: () => void,
  stop: () => void,
  isActive: boolean,
]

const useLocation = (
  isEnabled: UseLocationProps = true,
): UseLocationReturnType => {
  // TODO: maybe isActive could be removed somehow
  const [location, setLocation] = useState<GeoCoordinates | null>(null)
  const [isActive, setIsActive] = useState(isEnabled)
  const watchId = useRef<number | null>(null)
  const [retryTimeoutId, setRetryTimeoutId] = useState<number | null>(null)

  const [updateInterval] = useData(
    S.locUpdateInterval,
    LocUpdateInterval.default,
  )

  const [updateDistance] = useData(
    S.locUpdateDistance,
    LocUpdateDistance.default,
  )

  const start = () => {
    if (watchId.current !== null) return null

    const id = Geolocation.watchPosition(
      (position) => {
        // console.log('POSITION: ', position)
        setLocation(position.coords)
        setIsActive(true)
        if (retryTimeoutId) {
          clearTimeout(retryTimeoutId)
          setRetryTimeoutId(null)
        }
      },
      (error) => {
        console.log(error?.code)
        // TODO: show a Toast about the error
        stop()
        // retry geoloc every 10 seconds
        if (!retryTimeoutId) {
          setRetryTimeoutId(setTimeout(start, 10000))
        }
      },
      {
        enableHighAccuracy: true,
        distanceFilter: updateDistance, // distance in meters before a new location update
        interval: updateInterval * 1000,
        fastestInterval: updateInterval * 1000,
        forceRequestLocation: true,
        showLocationDialog: false,
      },
    )
    watchId.current = id
  }

  const stop = () => {
    setIsActive(false)
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current)
      watchId.current = null
      // Geolocation.stopObserving() // gives an annoying warning in dev mode
    }
    if (retryTimeoutId) clearTimeout(retryTimeoutId)
    setRetryTimeoutId(null)
  }

  useAppState(start, stop)

  useEffect(() => {
    if (Platform.OS === 'android') {
      _requestLocPermission()
    }
    if (!isEnabled) {
      stop()
    } else {
      start()
    }
    return stop
  }, [isEnabled]) // eslint-disable-line react-hooks/exhaustive-deps

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
