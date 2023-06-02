import React, { useState } from 'react'
import { View, Switch, StyleSheet } from 'react-native'
import Menu from '@/components/menu/Menu'
import MenuItem from '@/components/menu/MenuItem'
import UIButton from '@/components/UIButton'
import UISlider from '@/components/UISlider'
import { Setting as S } from '@/state/Repository'
import { useData } from '@/hooks/useData.android'
import {
  IsMapLocked,
  LocUpdateDistance,
  LocUpdateInterval,
  ZoomLevel,
} from '@/AppConstants'

type AppMenuProps = {
  onOpen: () => void
  onClose: () => void
}

const AppMenu: React.FC<AppMenuProps> = ({ onOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [zoomLevel, setZoomLevel] = useData(S.zoomLevel, ZoomLevel.default)

  // TODO: *optionally* abstract away the defaultValue argument somehow
  // TODO: if there are too many settings, move the state to dedicated components
  const [locUpdateInterval, setLocUpdateInterval] = useData(
    S.locUpdateInterval,
    LocUpdateInterval.default,
  )
  const [locUpdateDistance, setLocUpdateDistance] = useData(
    S.locUpdateDistance,
    LocUpdateDistance.default,
  )
  const [isMapLocked, setIsMapLocked] = useData(
    S.isMapLocked,
    IsMapLocked.default,
  )

  const handleMapLockSwitch = () => {
    setIsMapLocked(!isMapLocked)
  }

  const handleMenuPress = () => {
    isOpen ? onClose() : onOpen()
    setIsOpen(!isOpen)
  }

  const handleSliderValueChange = (newValue: number) => {
    setZoomLevel(newValue)
  }

  return (
    <>
      <View style={styles.menuButton}>
        <UIButton onPress={handleMenuPress} text={'MENU'} />
      </View>
      <Switch
        style={styles.lockSwitch}
        value={isMapLocked}
        thumbColor={isMapLocked ? '#e32d2d' : 'green'}
        onValueChange={handleMapLockSwitch}
      />
      <Menu isVisible={isOpen}>
        <MenuItem title="Default Zoom Level" direction="column">
          <UISlider
            minValue={ZoomLevel.min}
            maxValue={ZoomLevel.max}
            initialValue={zoomLevel}
            onValueChange={handleSliderValueChange}
          />
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
