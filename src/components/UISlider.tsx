import React, { useState } from 'react'
import Slider from '@react-native-community/slider'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

type UISliderProps = {
  minValue: number
  maxValue: number
  initialValue: number
  step?: number
  onValueChange: (newValue: number) => void
}

const UISlider: React.FC<UISliderProps> = ({
  minValue,
  maxValue,
  initialValue,
  onValueChange,
  step = 1,
}) => {
  const [value, setValue] = useState(initialValue)

  const handleValueChange = (newValue: number) => {
    setValue(newValue)
    onValueChange(newValue)
  }

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={minValue}
        maximumValue={maxValue}
        step={step}
        value={value}
        onValueChange={handleValueChange}
        thumbTintColor="red"
        minimumTrackTintColor="red"
        maximumTrackTintColor="green"
      />
      <Text>{value}</Text>
    </View>
  )
}

const { width: viewportWidth } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    height: 40,
    width: viewportWidth * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: '80%',
    height: 40,
  },
})

export default UISlider
