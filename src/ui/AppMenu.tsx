import React, { useState } from 'react'
import { View, Button, Switch, StyleSheet } from 'react-native'
import Menu from '../components/menu/Menu'
import MenuItem from '../components/menu/MenuItem'

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
})

const AppMenu = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [switchValue, setSwitchValue] = useState(false)

  const handleMenuPress = () => {
    setIsVisible(!isVisible)
  }

  return (
    <>
      <View style={styles.menuButton}>
        <Button title={'MENU'} onPress={handleMenuPress} />
      </View>
      <Menu visible={isVisible} onRequestClose={handleMenuPress}>
        <MenuItem title="Option 1">
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
