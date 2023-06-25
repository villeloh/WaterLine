import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { AppColors } from 'AppConstants'

type UIButtonProps = {
  onPress?: () => void
  text?: string
  color?: string // make a proper type for it
  textColor?: string
}

const UIButton = ({
  onPress,
  text = '',
  color = AppColors.btnColorPrimary,
  textColor = AppColors.btnTextColorPrimary,
}: UIButtonProps) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.button, color ? { backgroundColor: color } : {}]}>
          <Text style={(styles.text, { color: textColor })}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { fontSize: 18 },
})

export default UIButton
