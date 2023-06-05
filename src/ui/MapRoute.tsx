import React from 'react'
import {
  MarkerDragEvent,
  MarkerDragStartEndEvent,
  MarkerPressEvent,
  Polyline,
} from 'react-native-maps'
// NOTE: had to modify the library to export it; be careful with updates !!!
import { PolylinePressEvent } from 'react-native-maps/lib/MapPolyline'
import { MapRoute as MR } from '@/AppConstants'
import RouteData from '@/state/model/RouteData'
import MapMarker from './MapMarker'
import { metersBetween } from '@/utils/calc'

type MapRouteProps = {
  isEditable: boolean
  routeData: RouteData
  onPress?: (event: PolylinePressEvent) => void
  onMarkerPress?: (event: MarkerPressEvent) => void
  onMarkerDrag?: (event: MarkerDragEvent) => void
  onMarkerDragEnd?: (event: MarkerDragStartEndEvent, index: number) => void
}

const MapRoute: React.FC<MapRouteProps> = ({
  routeData,
  isEditable,
  onPress,
  onMarkerPress,
  onMarkerDrag,
  onMarkerDragEnd,
}) => {
  const totalDistanceSoFar = (index: number) => {
    if (index === 0) return 0

    const coords = routeData.coordinates
    let total = 0
    for (let i = 0; i < index; i++) {
      total += metersBetween(coords[i], coords[i + 1])
    }
    return total
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
          distanceFromPrev={
            index > 0
              ? metersBetween(routeData.coordinates[index - 1], coord)
              : 0
          }
          totalDistance={totalDistanceSoFar(index)}
          isDraggable={isEditable}
          isTappable={true}
          isExpandable={!isEditable} // expanding interferes with deletion
          onDrag={onMarkerDrag ? onMarkerDrag : undefined}
          onDragEnd={
            onMarkerDragEnd
              ? (event) => onMarkerDragEnd(event, index)
              : undefined
          }
          onPress={onMarkerPress}
        />
      ))}
    </>
  )
}

export default MapRoute
