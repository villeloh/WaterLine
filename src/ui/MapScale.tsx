import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Region } from 'react-native-maps'
import Scale from '@/components/Scale'

type MapScaleProps = {
  region: Region | null
}

const MapScale: React.FC<MapScaleProps> = ({ region }) => {
  return (
    <View style={styles.container}>
      <Scale region={region} />
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
