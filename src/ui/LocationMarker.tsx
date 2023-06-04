import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { LatLng, Marker } from 'react-native-maps'

type LocationMarkerProps = {
  location: LatLng | null
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ location }) => {
  const opacityAnim = useRef(new Animated.Value(0.8)).current

  // flashing animation
  const animateMarker = () => {
    Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 0.4,
        duration: 500,
        useNativeDriver: false, // causes excessive flashing if set to 'true'
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start()
  }

  // to stop too frequent updates
  const truncatedLat = Number(location?.latitude.toFixed(3)) || 0
  const truncatedLong = Number(location?.longitude.toFixed(3)) || 0

  useEffect(() => {
    animateMarker()
  }, [truncatedLat, truncatedLong]) // eslint-disable-line react-hooks/exhaustive-deps

  return location !== null ? (
    <Marker coordinate={location}>
      <Animated.View style={[styles.markerStyle, { opacity: opacityAnim }]} />
    </Marker>
  ) : null
}

const styles = StyleSheet.create({
  markerStyle: {
    height: 16,
    width: 16,
    borderRadius: 10,
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 2,
  },
})

export default LocationMarker
