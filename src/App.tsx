import React, { useEffect, useRef, useState } from 'react'
import MapView, {
  enableLatestRenderer,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps'
enableLatestRenderer()
import { SafeAreaView, StyleSheet } from 'react-native'
import useLocation from '@/hooks/useLocation.android'
import AppMenu from '@/ui/AppMenu'
import { MapType } from '@/state/Repository'
import MapScale from './ui/MapScale'
import LocationMarker from './ui/LocationMarker'

function App() {
  // 'enabled' = allowed by the user settings; 'active' = allowed by current app state
  const [mapType, setMapType] = useState<MapType>('standard') // TODO: load it from settings
  const [isGeoLocEnabled, setIsGeoLocEnabled] = useState(true) // TODO: load it from settings
  const [region, setRegion] = useState<Region | null>(null)
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
        // onPanDrag={stopGeoLoc}
        // onRegionChangeComplete={startGeoLoc} // TODO: fix race condition with menu actions
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType={mapType}
        showsUserLocation={false}
        showsMyLocationButton={false}
        onRegionChangeComplete={setRegion}
      >
        <LocationMarker location={location ?? { latitude: 0, longitude: 0 }} />
      </MapView>
      <MapScale
        longDelta={region?.longitudeDelta ?? 0}
        latitude={region?.latitude ?? 0}
      />
      <AppMenu onClose={onMenuClose} onOpen={onMenuOpen} />
    </SafeAreaView>
  )
}

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

export default App
