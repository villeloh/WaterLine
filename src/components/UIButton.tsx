import React from 'react'
import { View, Pressable, StyleSheet, Text } from 'react-native'
import { AppColors } from '../AppConstants'

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.5 },
  notPressed: { opacity: 1 },
  text: { fontSize: 18 },
})

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
      <Pressable
        onPress={onPress}
        android_ripple={{ color: 'white', borderless: false, radius: 30 }}
        style={({ pressed }) => [pressed ? styles.pressed : styles.notPressed]}
      >
        <View style={[styles.button, color ? { backgroundColor: color } : {}]}>
          <Text style={(styles.text, { color: textColor })}>{text}</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default UIButton
