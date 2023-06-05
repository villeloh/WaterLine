import React, { useEffect, useRef, useState } from 'react'
import MapView, {
  enableLatestRenderer,
  MapPressEvent,
  MarkerDragStartEndEvent,
  MarkerPressEvent,
  PROVIDER_GOOGLE,
} from 'react-native-maps'
enableLatestRenderer()
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'
import useLocation from '@/hooks/useLocation.android'
import AppMenu from '@/ui/AppMenu'
import { Setting as S, TripData as TD } from '@/state/Repository'
import { useData } from '@/hooks/useData.android'
import { MapRegion, IsMapLocked, DefaultMapType } from '@/AppConstants'
import LockSwitch from '@/ui/LockSwitch'
import MapRoute from '@/ui/MapRoute'
import MapScale from '@/ui/MapScale'
import LocationMarker from '@/ui/LocationMarker'
import RouteData from '@/state/model/RouteData'
import Dialog from '@/components/Dialog'

function App() {
  // 'enabled' = allowed by the user settings; 'active' = allowed by current app state
  const [mapType, setMapType, persistMapType] = useData(
    S.mapType,
    DefaultMapType,
  )
  const [isMapLocked, setIsMapLocked, persistIsMapLocked] = useData(
    S.isMapLocked,
    IsMapLocked.default,
  )
  const [routeData, setRouteData, persistRouteData] = useData(
    TD.route,
    new RouteData([]),
  )
  const [region, setRegion, persistRegion] = useData(
    S.mapRegion,
    MapRegion.default,
  )
  const [location, startGeoLoc, stopGeoLoc, isGeoLocActive] =
    useLocation(isMapLocked)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<string>('') // TODO: get rid of it somehow
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null)

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

  const onMapLongPress = () => {
    if (selectedMarkerId !== null) {
      setShowDeleteDialog(true)
      setDeleteTarget('marker')
    }
  }

  const onMapLockSwitch = (newValue: boolean) => {
    setIsMapLocked(newValue)
    // persist data to Repo on map lock (most convenient occasion)
    // TODO: refactor useData as a singleton to make things less convoluted
    if (newValue) {
      persistIsMapLocked()
      persistMapType()
      persistRegion()
      persistRouteData()
    }
  }

  const onMapRoutePress = () => {
    setShowDeleteDialog(true)
    setDeleteTarget('route')
  }

  // markers have no onLongPress event, meaning we have to 'select' them first with a
  // regular press, then delete the selected marker when the map is long-pressed
  const onMarkerPress = (event: MarkerPressEvent) => {
    setSelectedMarkerId(Number(event.nativeEvent.id))
    setDeleteTarget('marker')
  }

  const deleteMapRoute = () => {
    setRouteData(new RouteData([]))
  }

  const deleteMarker = (id: number) => {
    const newCoords = routeData.coordinates.filter((_, index) => index !== id)
    setRouteData(new RouteData(newCoords))
    setSelectedMarkerId(null) // Reset selected marker
  }

  const onMarkerDrag = () => {
    setSelectedMarkerId(null) // prevent delete dialog
  }

  const onMarkerDragEnd = (event: MarkerDragStartEndEvent, index: number) => {
    // edit the state to reflect the new Marker location
    const coords = [...routeData.coordinates]
    coords[index] = event.nativeEvent.coordinate
    setRouteData(new RouteData(coords))
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppMenu
        onClose={onMenuClose}
        onOpen={onMenuOpen}
        mapProps={{ mapType, setMapType }}
      />
      <LockSwitch isMapLocked={isMapLocked} onSwitch={onMapLockSwitch} />
      <TouchableWithoutFeedback onLongPress={onMapLongPress}>
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
          <LocationMarker location={location} />
          <MapRoute
            isEditable={!isMapLocked}
            routeData={routeData}
            onPress={!isMapLocked ? onMapRoutePress : undefined}
            onMarkerPress={!isMapLocked ? onMarkerPress : undefined}
            onMarkerDrag={!isMapLocked ? onMarkerDrag : undefined}
            onMarkerDragEnd={!isMapLocked ? onMarkerDragEnd : undefined}
          />
        </MapView>
      </TouchableWithoutFeedback>
      <MapScale region={region} />
      <Dialog
        isVisible={showDeleteDialog}
        text={
          deleteTarget === 'route'
            ? 'DELETE ROUTE ?'
            : `DELETE MARKER # ${
                selectedMarkerId !== null ? selectedMarkerId + 1 : '[null]'
              } ?`
        }
        yesButtonText={'YES'}
        noButtonText={'NO'}
        onYesButtonClick={() => {
          deleteTarget === 'route'
            ? deleteMapRoute()
            : selectedMarkerId !== null && deleteMarker(selectedMarkerId)
          setShowDeleteDialog(false)
        }}
        onNoButtonClick={() => setShowDeleteDialog(false)}
        position={{ top: 0.4, left: 0.21 }}
      />
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
