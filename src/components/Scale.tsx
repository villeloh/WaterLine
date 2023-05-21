/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Dimensions, Text, StyleSheet } from 'react-native'
import { longDeltaToM } from '@/utils/calc'

type ScaleProps = {
  longDelta: number // longitude delta
  latitude: number
}

const Scale: React.FC<ScaleProps> = ({ longDelta, latitude }) => {
  const windowWidth = Dimensions.get('window').width

  const calculateScaleMax = () => {
    return longDeltaToM(longDelta, latitude)
  }

  let scaleMax = calculateScaleMax()
  let unit = 'm'
  if (scaleMax > 1500) {
    scaleMax = scaleMax / 1000
    unit = 'km'
  }

  return (
    <View style={[styles.container, { width: windowWidth - 20 }]}>
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
            0,
          )} ${unit}`}</Text>
        </View>
        <View>
          <Text style={{ textAlign: 'right' }}>{`${scaleMax.toFixed(
            0,
          )} ${unit}`}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
})

export default Scale
