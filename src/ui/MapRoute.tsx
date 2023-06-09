import React from 'react'
import {
  MarkerDragStartEndEvent,
  MarkerPressEvent,
  Polyline,
} from 'react-native-maps'
// NOTE: had to modify the library to export it; be careful with updates !!!
import { PolylinePressEvent } from 'react-native-maps/lib/MapPolyline'
import { MapRoute as MR, Marker } from '@/AppConstants'
import RouteData from '@/state/model/RouteData'
import MapMarker from '@/ui/MapMarker'
import { metersBetween } from '@/utils/calc'

type MapRouteProps = {
  isEditable: boolean
  routeData: RouteData
  selectedMarkerId: number | null
  lineColor: string
  lineWidth: number
  onPress?: (event: PolylinePressEvent) => void
  onMarkerPress?: (event: MarkerPressEvent) => void
  onMarkerDragStart?: (event: MarkerDragStartEndEvent) => void
  onMarkerDragEnd?: (event: MarkerDragStartEndEvent, index: number) => void
}

const MapRoute: React.FC<MapRouteProps> = ({
  isEditable,
  routeData,
  selectedMarkerId,
  lineColor,
  lineWidth,
  onPress,
  onMarkerPress,
  onMarkerDragStart,
  onMarkerDragEnd,
}) => {
  const _totalDistanceSoFar = (index: number) => {
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
        onPress={onPress ? onPress : undefined}
        strokeWidth={lineWidth}
        strokeColor={lineColor}
        lineCap={MR.lineCap}
        lineJoin={MR.lineJoin}
        geodesic={false} // Google Maps uses Mercator, so it should make sense
      />
      {routeData.coordinates.map((coord, index) => (
        <MapMarker
          key={index + (selectedMarkerId ?? 0)}
          id={'' + index}
          location={coord}
          color={
            selectedMarkerId === index
              ? Marker.color.selected
              : Marker.color.default
          }
          distanceFromPrev={
            index > 0
              ? metersBetween(routeData.coordinates[index - 1], coord)
              : 0
          }
          totalDistance={_totalDistanceSoFar(index)}
          isDraggable={isEditable}
          isTappable={true}
          isExpandable={!isEditable} // expanding interferes with other interactions
          onDragStart={onMarkerDragStart ? onMarkerDragStart : undefined}
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
