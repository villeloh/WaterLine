import React, { useEffect, useRef, useState } from 'react'
import MapView, {
  enableLatestRenderer,
  LongPressEvent,
  MapPressEvent,
  MarkerDragStartEndEvent,
  MarkerPressEvent,
  PROVIDER_GOOGLE,
} from 'react-native-maps'
enableLatestRenderer()
import { SafeAreaView, StyleSheet } from 'react-native'
import useLocation from 'hooks/useLocation.android'
import AppMenu from 'ui/AppMenu'
import { TripData as TD, Setting as S, RouteData } from 'state/types'
import { useData, usePersist } from 'hooks'
import { MapMeasureLine as MML } from 'AppConstants'
import {
  LockSwitch,
  MapRoute,
  MapScale,
  LocationMarker,
  MapMeasureLine,
  DeleteDialog,
  DeleteTarget,
} from 'ui'
import { Actions, pickAction, isValidStartCoord } from 'utils/other'

function AppContent() {
  // 'enabled' = allowed by the user settings; 'active' = allowed by current app state
  const [mapType] = useData(S.mapType)
  const [lineWidth] = useData(S.lineWidth)
  const [lineColor] = useData(S.lineColor)
  const [isMapLocked, setIsMapLocked] = useData(S.isMapLocked)
  const [routeData, setRouteData] = useData(TD.route)
  const [region, setRegion] = useData(S.mapRegion)
  const [measureLineEndCoord, setMeasureLineEndCoord] = useData(
    TD.measureLineEndCoord,
  )
  const [location, startGeoLoc, stopGeoLoc, isGeoLocActive] =
    useLocation(isMapLocked)
  const persistAllData = usePersist() // save all data to Repo (to survive app restart)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>('route') // TODO: get rid of it somehow
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null)

  const mapRef = useRef<MapView>(null)

  // TODO: this mess should not be here; extract it into a hook maybe?
  useEffect(() => {
    const updatePosition = async () => {
      if (!isGeoLocActive) return

      try {
        const camera = await mapRef?.current?.getCamera()

        mapRef.current?.animateCamera({
          ...camera,
          center: location ?? undefined,
        })
      } catch (error) {
        console.log('CAMERA ERROR: ', error)
      }
    }
    updatePosition()
  }, [location, isGeoLocActive])

  // TODO: These could be within the AppMenu itself
  const onMenuClose = () => {
    startGeoLoc()
  }

  const onMenuOpen = () => {
    stopGeoLoc()
  }

  const onMapPress = (e: MapPressEvent) => {
    const isMapPress = e.nativeEvent.action === 'press'
    if (!isMapPress) return // marker press

    if (selectedMarkerId) {
      setSelectedMarkerId(null)
    } else {
      const { latitude, longitude } = e.nativeEvent.coordinate
      setRouteData(
        new RouteData([...routeData.coordinates, { latitude, longitude }]),
      )
    }
  }

  const onMeasureLinePress = () => {
    setShowDeleteDialog(true)
    setDeleteTarget('measureLine')
  }

  const onMapLongPress = (event: LongPressEvent) => {
    if (selectedMarkerId !== null) {
      setShowDeleteDialog(true)
      setDeleteTarget('marker')
    } else {
      if (isValidStartCoord(location))
        setMeasureLineEndCoord(event.nativeEvent.coordinate)
    }
  }

  const onMapLockSwitch = (newValue: boolean) => {
    setIsMapLocked(newValue)
    // persist data to Repo on lock switch (most convenient occasion)
    persistAllData()
  }

  const onMapRoutePress = () => {
    setShowDeleteDialog(true)
    setDeleteTarget('route')
  }

  // markers have no onLongPress event, meaning that we have to 'select' them first with a
  // regular press, then prompt for deletion with the second press
  const onMarkerPress = (event: MarkerPressEvent) => {
    setDeleteTarget('marker')

    const pressedMarkerId = Number(event.nativeEvent.id)
    if (selectedMarkerId === pressedMarkerId) {
      setShowDeleteDialog(true)
    } else {
      setSelectedMarkerId(Number(pressedMarkerId))
    }
  }

  const deleteMapRoute = () => {
    setRouteData(new RouteData([]))
  }

  const deleteMeasureLine = () => {
    setMeasureLineEndCoord(null)
  }

  // TODO: bug: if you delete marker #1, the color of the new #1 marker stays green, even though
  // it's not selected. This is due to rendering behavior of the Maps library, so nothing can probably be done about it
  const deleteMarker = (id: number) => {
    const newCoords = routeData.coordinates.filter((_, index) => index !== id)
    setRouteData(new RouteData(newCoords))
    setSelectedMarkerId(null) // Reset selected marker
  }

  // not needed atm; causes a weird index bug with onMarkerDragEnd() if enabled
  const onMarkerDragStart = () => {
    // setSelectedMarkerId(null) // prevent delete dialog
  }

  const onMarkerDragEnd = (event: MarkerDragStartEndEvent, index: number) => {
    // edit the state to reflect the new Marker location
    const coords = [...routeData.coordinates]
    coords[index] = event.nativeEvent.coordinate
    setRouteData(new RouteData(coords))
  }

  const onMeasureLineMarkerDragEnd = (event: MarkerDragStartEndEvent) => {
    setMeasureLineEndCoord(event.nativeEvent.coordinate)
  }

  const deleteActions: Actions = {
    route: deleteMapRoute,
    measureLine: deleteMeasureLine,
    marker: () => selectedMarkerId !== null && deleteMarker(selectedMarkerId),
  }

  return (
    <SafeAreaView style={styles.container}>
      <LockSwitch isMapLocked={isMapLocked} onSwitch={onMapLockSwitch} />
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType={mapType}
        initialRegion={region}
        showsUserLocation={false} // we use a custom marker
        showsMyLocationButton={false} // automatic
        onRegionChangeComplete={(reg) => {
          setRegion(reg)
        }}
        onPress={!isMapLocked ? onMapPress : undefined}
        onLongPress={onMapLongPress}
      >
        <LocationMarker location={location} />
        <MapRoute
          isEditable={!isMapLocked}
          routeData={routeData}
          selectedMarkerId={selectedMarkerId}
          lineColor={lineColor}
          lineWidth={lineWidth}
          onPress={!isMapLocked ? onMapRoutePress : undefined}
          onMarkerPress={!isMapLocked ? onMarkerPress : undefined}
          onMarkerDragStart={!isMapLocked ? onMarkerDragStart : undefined}
          onMarkerDragEnd={!isMapLocked ? onMarkerDragEnd : undefined}
        />
        <MapMeasureLine
          startCoord={measureLineEndCoord ? location : null}
          endCoord={measureLineEndCoord}
          lineColor={MML.lineColor.default}
          lineWidth={lineWidth}
          onPress={onMeasureLinePress}
          onMarkerDragEnd={onMeasureLineMarkerDragEnd}
        />
      </MapView>
      <MapScale region={region} />
      <DeleteDialog
        isVisible={showDeleteDialog}
        deleteTarget={deleteTarget}
        selectedMarkerId={selectedMarkerId}
        onYesButtonPress={() => {
          pickAction(deleteTarget, deleteActions, null)
          setShowDeleteDialog(false)
        }}
        onNoButtonPress={() => {
          if (deleteTarget === 'marker') {
            setSelectedMarkerId(null)
          }
          setShowDeleteDialog(false)
        }}
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

export default AppContent
