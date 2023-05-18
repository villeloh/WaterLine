import React from 'react'
import { View, StyleSheet } from 'react-native'

type MenuProps = {
  isVisible: boolean
  children?: React.ReactNode
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    width: '90%',
    marginBottom: '5%',
    marginTop: '16%',
    padding: '5%',
    borderRadius: 20,
  },
})

const Menu: React.FC<MenuProps> = ({ isVisible, children }) => {
  return isVisible ? <View style={styles.container}>{children}</View> : null
}
export default Menu
