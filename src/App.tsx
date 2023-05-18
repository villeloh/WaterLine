import React, { useEffect, useRef, useState } from 'react'
import MapView, {
  enableLatestRenderer,
  PROVIDER_GOOGLE,
} from 'react-native-maps'
enableLatestRenderer()
import { SafeAreaView, StyleSheet } from 'react-native'
import useLocation from './hooks/useLocation.android'
import AppMenu from './ui/AppMenu'
import { MapType } from './state/Repository'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})

function App() {
  // 'enabled' = allowed by the user settings; 'active' = allowed by current app state
  const [mapType, setMapType] = useState<MapType>('standard') // TODO: load it from settings
  const [isGeoLocEnabled, setIsGeoLocEnabled] = useState(true) // TODO: load it from settings
  const [location, startGeoLoc, stopGeoLoc, isGeoLocActive] =
    useLocation(isGeoLocEnabled)
  const mapRef = useRef<MapView>(null)

  useEffect(() => {
    const updatePosition = async () => {
      if (!isGeoLocActive) return

      try {
        const camera = await mapRef?.current?.getCamera()

        mapRef.current?.animateCamera({
          ...camera,
          center: {
            latitude: location?.latitude || 0,
            longitude: location?.longitude || 0,
          },
        })
      } catch (error) {
        console.log('CAMERA ERROR: ', error)
      }
    }
    updatePosition()
  }, [location, isGeoLocActive])

  const onMenuClose = () => {
    startGeoLoc()
  }

  const onMenuOpen = () => {
    stopGeoLoc()
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        onPanDrag={stopGeoLoc}
        onRegionChangeComplete={startGeoLoc}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType={mapType}
        showsUserLocation={true}
        showsMyLocationButton={false}
      />
      <AppMenu onClose={onMenuClose} onOpen={onMenuOpen} />
    </SafeAreaView>
  )
}
export default App
