import React, { useState, useEffect } from 'react'
import { View, Switch, StyleSheet } from 'react-native'
import Menu from '@/components/menu/Menu'
import MenuItem from '@/components/menu/MenuItem'
import UIButton from '@/components/UIButton'
import UISlider from '@/components/UISlider'
import { Repo, Setting as S } from '@/state/Repository'

type AppMenuProps = {
  onOpen: () => void
  onClose: () => void
}

const AppMenu: React.FC<AppMenuProps> = ({ onOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [switchValue, setSwitchValue] = useState(false)
  const initialZoomLevel = 5 // TODO: get it from the Repo / store it there

  const [isMapLocked, setIsMapLocked] = useState(false)

  useEffect(() => {
    const initialValue = Repo.load(S.isMapLocked) ?? false
    setIsMapLocked(initialValue)
  }, [])

  const handleMapLockSwitch = () => {
    const newValue = !isMapLocked
    setIsMapLocked(newValue)
    Repo.save(S.isMapLocked, newValue)
  }

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
      <Switch
        style={styles.lockSwitch}
        value={isMapLocked}
        onValueChange={handleMapLockSwitch}
        thumbColor={isMapLocked ? '#e32d2d' : 'green'}
      />
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
  lockSwitch: {
    position: 'absolute',
    top: 15,
    right: 90,
    transform: [{ scaleX: 1.3 }, { scaleY: 1 }],
  },
})

export default AppMenu
