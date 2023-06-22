import React, { useRef } from 'react'
import { Animated, View, StyleSheet, Image } from 'react-native'
import { LatLng, Marker } from 'react-native-maps'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const loc_marker = require('@/loc_marker.png')

type LocationMarkerProps = {
  location: LatLng | null
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ location }) => {
  // const opacityAnim = useRef(new Animated.Value(0.8)).current

  // flashing animation
  /*
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
  }  */
  /*
  // to stop too frequent updates
  const truncatedLat = Number(location?.latitude.toFixed(3)) || 0
  const truncatedLong = Number(location?.longitude.toFixed(3)) || 0

  useEffect(() => {
    // animateMarker()
  }, [truncatedLat, truncatedLong]) // eslint-disable-line react-hooks/exhaustive-deps
  */

  return location !== null ? (
    <Marker
      coordinate={location}
      tracksInfoWindowChanges={false}
      // image={loc_marker} // scaled incorrectly in APK-installed app
    />
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
