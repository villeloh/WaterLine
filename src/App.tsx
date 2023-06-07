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
import useLocation from '@/hooks/useLocation.android'
import AppMenu from '@/ui/AppMenu'
import { Setting as S, TripData as TD } from '@/state/Repository'
import { useData } from '@/hooks/useData.android'
import {
  MapRegion,
  IsMapLocked,
  DefaultMapType,
  MapRoute as MR,
  MapMeasureLine as MML,
  LocUpdateInterval as LocUI,
  LocUpdateDistance as LocUD,
} from '@/AppConstants'
import LockSwitch from '@/ui/LockSwitch'
import MapRoute from '@/ui/MapRoute'
import MapScale from '@/ui/MapScale'
import LocationMarker from '@/ui/LocationMarker'
import RouteData from '@/state/model/RouteData'
import MapMeasureLine from '@/ui/MapMeasureLine'
import DeleteDialog, { DeleteTarget } from '@/ui/DeleteDialog'
import { Actions, isValidStartCoord, pickAction } from '@/utils/other'

// TODO: the app component is getting bloated with all the logic; modularize it somehow
function App() {
  // 'enabled' = allowed by the user settings; 'active' = allowed by current app state
  // TODO: *optionally* abstract away the defaultValue argument somehow
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
  const [
    measureLineEndCoord,
    setMeasureLineEndCoord,
    persistMeasureLineEndCoord,
  ] = useData(TD.measureLineEndCoord, null)
  const [region, setRegion, persistRegion] = useData(
    S.mapRegion,
    MapRegion.default,
  )
  const [lineWidth, setLineWidth, persistLineWidth] = useData(
    S.lineWidth,
    MR.lineWidth.default,
  )
  const [lineColor, setLineColor, persistLineColor] = useData(
    S.lineColor,
    MR.lineColor.default,
  )

  // TODO: hook these up to the menu
  const [locUpdateInterval, setLocUpdateInterval] = useData(
    S.locUpdateInterval,
    LocUI.default,
  )
  const [locUpdateDistance, setLocUpdateDistance] = useData(
    S.locUpdateDistance,
    LocUD.default,
  )

  const [location, startGeoLoc, stopGeoLoc, isGeoLocActive] =
    useLocation(isMapLocked)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>('route') // TODO: get rid of it somehow
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null)

  const mapRef = useRef<MapView>(null)

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

  const onMenuClose = () => {
    startGeoLoc()
  }

  const onMenuOpen = () => {
    stopGeoLoc()
  }

  const onMapPress = (e: MapPressEvent) => {
    const isMapPress = e.nativeEvent.action === 'press'
    if (!isMapPress) return // marker press

    const { latitude, longitude } = e.nativeEvent.coordinate

    setRouteData(
      new RouteData([...routeData.coordinates, { latitude, longitude }]),
    )
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
    // persist data to Repo on map lock (most convenient occasion)
    // TODO: refactor useData as a singleton to make things less convoluted
    if (newValue) {
      persistIsMapLocked()
      persistMapType()
      persistRegion()
      persistRouteData()
      persistLineWidth()
      persistLineColor()
      persistMeasureLineEndCoord()
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

  const deleteMeasureLine = () => {
    setMeasureLineEndCoord(null)
  }

  const deleteMarker = (id: number) => {
    const newCoords = routeData.coordinates.filter((_, index) => index !== id)
    setRouteData(new RouteData(newCoords))
    setSelectedMarkerId(null) // Reset selected marker
  }

  const onMarkerDragStart = () => {
    setSelectedMarkerId(null) // prevent delete dialog
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
      <AppMenu
        onClose={onMenuClose}
        onOpen={onMenuOpen}
        mapProps={{
          mapType,
          setMapType,
          lineColor,
          setLineColor,
          lineWidth,
          setLineWidth,
        }}
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
