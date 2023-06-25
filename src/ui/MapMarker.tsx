/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
import {
  LatLng,
  Marker,
  MarkerDragStartEndEvent,
  MarkerPressEvent,
} from 'react-native-maps'
import { View, Text, StyleSheet } from 'react-native'
import { Marker as M } from '@/AppConstants'

type MapMarkerProps = {
  id: string
  location: LatLng
  distanceFromPrev?: number
  totalDistance?: number
  isDraggable?: boolean
  isTappable?: boolean
  isExpandable?: boolean
  color?: string
  onDragStart?: (event: MarkerDragStartEndEvent) => void
  onDragEnd?: (event: MarkerDragStartEndEvent) => void
  onPress?: (event: MarkerPressEvent) => void
}

const MapMarker: React.FC<MapMarkerProps> = ({
  id,
  location,
  distanceFromPrev = 0,
  totalDistance = 0,
  isDraggable = true,
  isTappable = false,
  isExpandable = true,
  color = M.color.default,
  onDragStart,
  onDragEnd,
  onPress,
}) => {
  const distanceFromPrevText =
    distanceFromPrev > 0 ? `=> ${formatDistance(distanceFromPrev)}` : 'START'
  const totalDistanceText =
    totalDistance > 0 ? formatDistance(totalDistance) : 'START'

  const [showDistFromPrev, setShowDistFromPrev] = useState(false)

  const handlePress = (event: MarkerPressEvent) => {
    if (onPress) onPress(event)
    if (isExpandable && distanceFromPrev > 0)
      setShowDistFromPrev(!showDistFromPrev)
  }

  return (
    <Marker
      key={showDistFromPrev ? 'prevVisible' : 'prevHidden'}
      identifier={id}
      coordinate={location}
      draggable={isDraggable}
      tappable={isTappable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onPress={isTappable ? handlePress : undefined}
      tracksViewChanges={false} // 'true' decreases performance
    >
      <View style={styles.container}>
        <View
          style={[
            styles.balloon,
            showDistFromPrev && { height: 52 },
            { backgroundColor: color },
          ]}
        >
          {showDistFromPrev && (
            <Text style={[styles.text, { marginBottom: 2 }]}>
              {distanceFromPrevText}
            </Text>
          )}
          <Text style={styles.text}>{totalDistanceText}</Text>
        </View>
        <View style={[styles.triangle, { borderTopColor: color }]} />
      </View>
    </Marker>
  )
}
const styles = StyleSheet.create({
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 16,
  },
  container: {
    alignItems: 'center',
  },
  balloon: {
    borderRadius: 20,
    paddingHorizontal: 6,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  triangle: {
    width: 0,
    height: 0,
    borderColor: 'transparent',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 20,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -4,
  },
})

const formatDistance = (distance: number): string => {
  return distance > 999
    ? `${(distance / 1000).toFixed(1)} km`
    : `${distance.toFixed(0)} m`
}

export default MapMarker
