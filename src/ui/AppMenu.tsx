import React, { useState } from 'react'
import { View, Switch, StyleSheet } from 'react-native'
import Menu from '@/components/menu/Menu'
import MenuItem from '@/components/menu/MenuItem'
import UIButton from '@/components/UIButton'
import UISlider from '@/components/UISlider'

type AppMenuProps = {
  onOpen: () => void
  onClose: () => void
}

const AppMenu: React.FC<AppMenuProps> = ({ onOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [switchValue, setSwitchValue] = useState(false)
  const initialZoomLevel = 5 // TODO: get it from the Repo

  const handleMenuPress = () => {
    isOpen ? onClose() : onOpen()
    setIsOpen(!isOpen)
  }

  const handleSliderValueChange = (newValue: number) => {
    console.log(newValue)
  }

  return (
    <>
      <View style={styles.menuButton}>
        <UIButton onPress={handleMenuPress} text={'MENU'} />
      </View>
      <Menu isVisible={isOpen}>
        <MenuItem title="Default Zoom Level" direction="column">
          <UISlider
            minValue={1}
            maxValue={10}
            initialValue={initialZoomLevel}
            onValueChange={handleSliderValueChange}
          />
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

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
})

export default AppMenu
