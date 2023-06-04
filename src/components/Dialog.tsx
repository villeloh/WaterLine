import React, { FC } from 'react'
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native'

type DialogProps = {
  text: string
  yesButtonText: string
  noButtonText: string
  onYesButtonClick: () => void
  onNoButtonClick: () => void
  position: { top: number; left: number }
  isVisible: boolean
}

const Dialog: FC<DialogProps> = ({
  text,
  yesButtonText,
  noButtonText,
  onYesButtonClick,
  onNoButtonClick,
  position: { top, left },
  isVisible,
}) => {
  const { width, height } = Dimensions.get('window')
  const styles = getStyles(top, left, width, height)

  return isVisible ? (
    <View style={styles.dialogBox}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title={noButtonText} onPress={onNoButtonClick} />
        </View>
        <View style={styles.button}>
          <Button title={yesButtonText} onPress={onYesButtonClick} />
        </View>
      </View>
    </View>
  ) : null
}

const getStyles = (
  topPercent: number,
  leftPercent: number,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    dialogBox: {
      zIndex: 98,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: width * 0.6,
      position: 'absolute',
      top: height * topPercent,
      left: width * leftPercent,
      alignItems: 'center',
    },
    text: {
      fontSize: 16,
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      width: '45%',
      margin: 8,
    },
  })

export default Dialog
