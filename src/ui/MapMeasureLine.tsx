import React from 'react'
import { LatLng, MarkerDragStartEndEvent, Polyline } from 'react-native-maps'
// NOTE: had to modify the library to export it; be careful with updates !!!
import { PolylinePressEvent } from 'react-native-maps/lib/MapPolyline'
import { MapMeasureLine as MML } from '@/AppConstants'
import { MapMarker } from '@/ui'
import { metersBetween } from '@/utils/calc'
import { isValidStartCoord } from '@/utils/other'

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
  return startCoord && isValidStartCoord(startCoord) && endCoord ? (
    <>
      <Polyline
        coordinates={[startCoord, endCoord]}
        tappable={true}
        onPress={onPress ? onPress : undefined}
        strokeWidth={lineWidth}
        strokeColor={lineColor}
        lineCap={MML.lineCap}
        lineJoin={MML.lineJoin}
        geodesic={false} // Google Maps uses Mercator, so it should make sense
      />
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
    </>
  ) : null
}

export default MapMeasureLine
