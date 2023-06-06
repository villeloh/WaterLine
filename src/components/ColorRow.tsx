import React, { useState } from 'react'
import { View, Pressable, StyleSheet } from 'react-native'

type ColorRowProps = {
  colors: string[]
  initialChoice: string
  onValueChange: (newColor: string) => void
}

type ColorBoxProps = {
  color: string
  selected: boolean
  onSelect: () => void
}

const ColorBox: React.FC<ColorBoxProps> = ({ color, selected, onSelect }) => {
  const boxStyle = {
    backgroundColor: color,
  }

  const wrapperStyle = {
    borderColor: selected ? color : 'transparent',
  }

  return (
    <View style={[styles.boxWrapper, wrapperStyle]}>
      <Pressable style={[styles.box, boxStyle]} onPress={onSelect} />
    </View>
  )
}

const ColorRow: React.FC<ColorRowProps> = ({
  colors,
  initialChoice,
  onValueChange,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>(initialChoice)

  return (
    <View style={styles.container}>
      {colors.map((color, i) => (
        <ColorBox
          key={i}
          color={color}
          selected={color === selectedColor}
          onSelect={() => {
            setSelectedColor(color)
            onValueChange(color)
          }}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  boxWrapper: {
    width: 54, // Box size + double border width + double gap width
    height: 54,
    borderRadius: 6,
    borderWidth: 3,
    margin: 5,
    justifyContent: 'center', // Center the inner box
    alignItems: 'center',
  },
})

export default ColorRow
