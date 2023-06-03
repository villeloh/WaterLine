import React, { useEffect, useRef } from 'react'
import MapView, {
  enableLatestRenderer,
  MapPressEvent,
  PROVIDER_GOOGLE,
} from 'react-native-maps'
enableLatestRenderer()
import { SafeAreaView, StyleSheet } from 'react-native'
import useLocation from '@/hooks/useLocation.android'
import AppMenu from '@/ui/AppMenu'
import { Setting as S, TripData as TD } from '@/state/Repository'
import { useData } from '@/hooks/useData.android'
import { MapRegion, IsMapLocked } from '@/AppConstants'
import LockSwitch from '@/ui/LockSwitch'
import MapRoute from '@/ui/MapRoute'
import MapScale from '@/ui/MapScale'
import LocationMarker from '@/ui/LocationMarker'
import RouteData from '@/state/model/RouteData'
import { useState } from 'react'
import Dialog from './components/Dialog'

function App() {
  // 'enabled' = allowed by the user settings; 'active' = allowed by current app state
  const [mapType, setMapType] = useData(S.mapType, 'standard')
  const [isMapLocked, setIsMapLocked] = useData(
    S.isMapLocked,
    IsMapLocked.default,
  )
  const [routeData, setRouteData] = useData(TD.route, new RouteData([]))
  const [region, setRegion] = useData(S.mapRegion, MapRegion.default)
  const [location, startGeoLoc, stopGeoLoc, isGeoLocActive] =
    useLocation(isMapLocked)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
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

  const onMapPress = (e: MapPressEvent) => {
    // e.stopPropagation()
    const isMapPress = e.nativeEvent.action === 'press'
    if (!isMapPress) return // marker press

    const { latitude, longitude } = e.nativeEvent.coordinate

    setRouteData(
      new RouteData([...routeData.coordinates, { latitude, longitude }]),
    )
  }

  const onMapLockSwitch = (newValue: boolean) => {
    console.log('locked: ', newValue)
    setIsMapLocked(newValue)
  }

  const onMapRoutePress = () => {
    console.log('called onMapRoutePress')

    setShowDeleteDialog(!showDeleteDialog)
  }

  const deleteMapRoute = () => {
    setRouteData(new RouteData([]))
  }

  const deleteDialogText = 'Delete route ?'

  return (
    <SafeAreaView style={styles.container}>
      <AppMenu onClose={onMenuClose} onOpen={onMenuOpen} />
      <LockSwitch isMapLocked={isMapLocked} onSwitch={onMapLockSwitch} />
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
        onPress={!isMapLocked ? onMapPress : undefined}
      >
        {location && <LocationMarker location={location} />}
        <MapRoute
          isEditable={!isMapLocked}
          routeData={routeData}
          onPress={!isMapLocked ? onMapRoutePress : undefined}
        />
      </MapView>
      <MapScale region={region} />
      {showDeleteDialog && (
        <Dialog
          text={deleteDialogText}
          yesButtonText={'YES'}
          noButtonText={'NO'}
          onYesButtonClick={() => {
            deleteMapRoute()
            setShowDeleteDialog(false)
          }}
          onNoButtonClick={() => setShowDeleteDialog(false)}
          position={{ top: 0.4, left: 0.21 }}
        />
      )}
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
