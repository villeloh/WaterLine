import React from 'react'
import { View, Modal, StyleSheet } from 'react-native'

type MenuProps = {
  visible: boolean
  children?: React.ReactNode
  onRequestClose: () => void
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const Menu: React.FC<MenuProps> = ({ visible, children, onRequestClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.container}>{children}</View>
    </Modal>
  )
}
export default Menu
