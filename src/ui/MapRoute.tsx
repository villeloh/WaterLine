import React from 'react'
import { MarkerDragStartEndEvent, Polyline } from 'react-native-maps'
// NOTE: had to modify the library to export it; be careful with updates !!!
import { PolylinePressEvent } from 'react-native-maps/lib/MapPolyline'
import { MapRoute as MR } from '@/AppConstants'
import RouteData from '@/state/model/RouteData'
import MapMarker from './MapMarker'

type MapRouteProps = {
  isEditable: boolean
  routeData: RouteData
  setRouteData: (newData: RouteData) => void
  onPress?: (event: PolylinePressEvent) => void
}

const MapRoute: React.FC<MapRouteProps> = ({
  routeData,
  setRouteData,
  isEditable,
  onPress,
}) => {
  const onMarkerDragEnd = (event: MarkerDragStartEndEvent, index: number) => {
    // edit the state to reflect the new Marker location
    const coords = [...routeData.coordinates]
    coords[index] = event.nativeEvent.coordinate
    setRouteData(new RouteData(coords))
  }

  return (
    <>
      <Polyline
        coordinates={routeData.coordinates}
        tappable={isEditable}
        onPress={onPress}
        strokeWidth={MR.lineWidth}
        strokeColor={MR.lineColor}
        lineCap={MR.lineCap}
        lineJoin={MR.lineJoin}
        geodesic={false} // Google Maps uses Mercator, so it should make sense
      />
      {routeData.coordinates.map((coord, index) => (
        <MapMarker
          key={index}
          id={'' + index}
          location={coord}
          isDraggable={isEditable}
          isTappable={true}
          onDragEnd={(event) => onMarkerDragEnd(event, index)}
        />
      ))}
    </>
  )
}

export default MapRoute
