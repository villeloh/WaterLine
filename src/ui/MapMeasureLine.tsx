import React from 'react'
import { LatLng, MarkerDragStartEndEvent, Polyline } from 'react-native-maps'
// NOTE: had to modify the library to export it; be careful with updates !!!
import { PolylinePressEvent } from 'react-native-maps/lib/MapPolyline'
import { MapMeasureLine as MML } from '@/AppConstants'
import MapMarker from '@/ui/MapMarker'
import { metersBetween } from '@/utils/calc'

type MapMeasureLineProps = {
  startCoord: LatLng | null
  endCoord: LatLng | null
  lineColor: string
  lineWidth: number
  onPress?: (event: PolylinePressEvent) => void
  onMarkerDragEnd?: (event: MarkerDragStartEndEvent) => void
}

const MapMeasureLine: React.FC<MapMeasureLineProps> = ({
  startCoord,
  endCoord,
  lineColor,
  lineWidth,
  onPress,
  onMarkerDragEnd,
}) => {
  return endCoord ? (
    <>
      <Polyline
        coordinates={startCoord && endCoord ? [startCoord, endCoord] : []}
        tappable={true}
        onPress={onPress ? onPress : undefined}
        strokeWidth={lineWidth}
        strokeColor={lineColor}
        lineCap={MML.lineCap}
        lineJoin={MML.lineJoin}
        geodesic={false} // Google Maps uses Mercator, so it should make sense
      />
      {startCoord && endCoord ? (
        <MapMarker
          id={'measureMarker'}
          location={endCoord}
          totalDistance={metersBetween(startCoord, endCoord)}
          isDraggable={true}
          isTappable={false}
          isExpandable={false}
          color={MML.markerColor.default}
          onDragEnd={
            onMarkerDragEnd ? (event) => onMarkerDragEnd(event) : undefined
          }
        />
      ) : null}
    </>
  ) : null
}

export default MapMeasureLine
