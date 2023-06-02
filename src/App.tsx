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
import { Setting as S } from '@/state/Repository'
import MapScale from '@/ui/MapScale'
import LocationMarker from '@/ui/LocationMarker'
import { useData } from './hooks/useData.android'
import { Region as R } from './AppConstants'

function App() {
  // 'enabled' = allowed by the user settings; 'active' = allowed by current app state
  const [mapType, setMapType] = useData(S.mapType, 'standard')
  const [isGeoLocEnabled, setIsGeoLocEnabled] = useData(S.isGeoLocEnabled, true)
  const [region, setRegion] = useData(S.region, R.default)
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
        onPanDrag={(e) => {
          // stopGeoLoc()
        }}
        // onRegionChangeComplete={startGeoLoc} // TODO: fix race condition with menu actions
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType={mapType}
        showsUserLocation={false} // we use a custom marker
        showsMyLocationButton={false} // automatic
        onRegionChangeComplete={(reg) => {
          setRegion(reg)
        }}
      >
        <LocationMarker location={location ?? { latitude: 0, longitude: 0 }} />
      </MapView>
      <MapScale region={region} />
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
