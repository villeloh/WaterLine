import React from 'react'
import Scale from '@/components/Scale'
import { StyleSheet, View } from 'react-native'

type MapScaleProps = {
  longDelta: number
  latitude: number
}

const MapScale: React.FC<MapScaleProps> = ({ longDelta, latitude }) => {
  return (
    <View style={styles.container}>
      <Scale longDelta={longDelta} latitude={latitude} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
})

export default MapScale
