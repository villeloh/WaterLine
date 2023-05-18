import React, { useState } from 'react'
import { View, Switch, StyleSheet } from 'react-native'
import Menu from '@/components/menu/Menu'
import MenuItem from '@/components/menu/MenuItem'
import UIButton from '@/components/UIButton'

type AppMenuProps = {
  onOpen: () => void
  onClose: () => void
}

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 999,
  },
})

const AppMenu: React.FC<AppMenuProps> = ({ onOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [switchValue, setSwitchValue] = useState(false)

  const handleMenuPress = () => {
    isOpen ? onClose() : onOpen()
    setIsOpen(!isOpen)
  }

  return (
    <>
      <View style={styles.menuButton}>
        <UIButton onPress={handleMenuPress} text={'MENU'} />
      </View>
      <Menu isVisible={isOpen}>
        <MenuItem title="Default Zoom Level" direction="column">
          <Switch value={switchValue} onValueChange={setSwitchValue} />
        </MenuItem>
        <MenuItem title="Option 2">
          <Switch value={switchValue} onValueChange={setSwitchValue} />
        </MenuItem>
        <MenuItem title="Option 3">
          <Switch value={switchValue} onValueChange={setSwitchValue} />
        </MenuItem>
      </Menu>
    </>
  )
}

export default AppMenu
