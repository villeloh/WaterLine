import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Menu from '@/components/menu/Menu'
import MenuItem from '@/components/menu/MenuItem'
import UIButton from '@/components/UIButton'
import { MAP_TYPES, Setting as S } from '@/state/Repository'
import { useData } from '@/hooks/useData.android'
import { LocUpdateDistance, LocUpdateInterval, ZoomLevel } from '@/AppConstants'
import MapTypeOptions from '@/ui/MapTypeOptions'

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
      <Menu isVisible={isOpen}>
        <MenuItem title={'Map Type:  '} direction={'row'}>
          {/* TODO: give it state via a singleton form of useData() */}
          <MapTypeOptions options={MAP_TYPES} initialSelection={'standard'} />
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
    zIndex: 999,
  },
})

export default AppMenu
