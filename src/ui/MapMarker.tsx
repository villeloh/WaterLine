import React from 'react'
import {
  LatLng,
  Marker,
  MarkerDragEvent,
  MarkerDragStartEndEvent,
  MarkerPressEvent,
} from 'react-native-maps'

type MapMarkerProps = {
  id: string
  location: LatLng
  isDraggable: boolean
  isTappable: boolean
  onDrag?: (event: MarkerDragEvent) => void
  onDragEnd?: (event: MarkerDragStartEndEvent) => void
  onPress?: (event: MarkerPressEvent) => void
}

const MapMarker: React.FC<MapMarkerProps> = ({
  id,
  location,
  isDraggable = true,
  isTappable = false,
  onDrag,
  onDragEnd,
  onPress,
}) => {
  return (
    <Marker
      identifier={id}
      coordinate={location}
      draggable={isDraggable}
      tappable={isTappable}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onPress={onPress}
      tracksViewChanges={false} // 'true' decreases performance
    />
  )
}

export default MapMarker
