/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Dimensions, Text, StyleSheet } from 'react-native'
import { Region } from 'react-native-maps'
import { latDeltaToScreenM } from 'utils/calc'

type MapScaleProps = {
  region: Region | null
}

const MapScale: React.FC<MapScaleProps> = ({ region }) => {
  const windowWidth = Dimensions.get('window').width

  const { longitudeDelta = 0, latitudeDelta = 0 } = region ? region : {}

  const margin = 20
  const marginCorrectionRatio = (windowWidth - margin) / windowWidth

  // TODO: in theory, metersBetween() should be useable here, but it gives unreasonable values
  const calculateScaleMax = () => {
    return (
      latDeltaToScreenM(longitudeDelta, latitudeDelta) * marginCorrectionRatio
    )
  }

  let scaleMax = calculateScaleMax()
  let unit = 'm'
  if (scaleMax > 1500) {
    scaleMax = scaleMax / 1000
    unit = 'km'
  }

  return (
    <View style={[styles.container, { width: windowWidth - margin }]}>
      {/* Scale Bar */}
      <View style={{ flexDirection: 'row' }}>
        <View style={{ height: 10, width: 1, backgroundColor: 'black' }} />
        <View
          style={{
            height: 1,
            backgroundColor: 'black',
            width: '50%',
          }}
        />
        <View style={{ height: 10, width: 1, backgroundColor: 'black' }} />
        <View
          style={{
            height: 1,
            backgroundColor: 'black',
            width: '50%',
          }}
        />
        <View style={{ height: 10, width: 1, backgroundColor: 'black' }} />
      </View>
      {/* Labels */}
      <View style={styles.labels}>
        <View />
        <View>
          <Text style={{ textAlign: 'center' }}>{`${(scaleMax / 2).toFixed(
            1,
          )} ${unit}`}</Text>
        </View>
        <View>
          <Text style={{ textAlign: 'right' }}>{`${scaleMax.toFixed(
            1,
          )} ${unit}`}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
})

export default MapScale
