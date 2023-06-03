import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

type MenuProps = {
  isVisible: boolean
  children?: React.ReactNode
}

const Menu: React.FC<MenuProps> = ({ isVisible, children }) => {
  return isVisible ? <View style={styles.container}>{children}</View> : null
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '10%',
    left: '5%',
    flexGrow: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    width: windowWidth * 0.9,
    height: windowHeight * 0.87,
    padding: '5%',
    borderRadius: 20,
    zIndex: 99,
  },
})

export default Menu
