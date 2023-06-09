import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Menu from '@/components/menu/Menu'
import MenuItem from '@/components/menu/MenuItem'
import UIButton from '@/components/UIButton'
import { MAP_TYPES, MapType } from '@/state/Repository'
import { MapRoute as MR, DefaultMapType } from '@/AppConstants'
import MapTypeOptions from '@/ui/MapTypeOptions'
import UISlider from '@/components/UISlider'
import ColorRow from '@/components/ColorRow'
import { useData } from '@/hooks/useData.android'
import { Setting as S, TripData as TD } from '@/state/Repository'

type AppMenuProps = {
  onOpen: () => void
  onClose: () => void
}

const AppMenu: React.FC<AppMenuProps> = ({ onOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleMenuPress = () => {
    isOpen ? onClose() : onOpen()
    setIsOpen(!isOpen)
  }

  const [mapType, setMapType] = useData(S.mapType, DefaultMapType)
  const [lineWidth, setLineWidth] = useData(S.lineWidth, MR.lineWidth.default)
  const [lineColor, setLineColor] = useData(S.lineColor, MR.lineColor.default)

  return (
    <>
      <View style={styles.menuButton}>
        <UIButton onPress={handleMenuPress} text={'MENU'} />
      </View>
      <Menu isVisible={isOpen}>
        <MenuItem title={'Map Type:  '} direction={'row'}>
          <MapTypeOptions
            options={MAP_TYPES}
            initialSelection={mapType}
            onSelectOption={(option: string) => setMapType(option as MapType)}
          />
        </MenuItem>
        <MenuItem title={'Line width:'} direction={'column'}>
          <UISlider
            minValue={MR.lineWidth.min}
            maxValue={MR.lineWidth.max}
            initialValue={lineWidth}
            onValueChange={setLineWidth}
          />
        </MenuItem>
        <MenuItem title={'Line color:'} direction={'column'}>
          <ColorRow
            colors={MR.lineColor.choices}
            initialChoice={lineColor}
            onValueChange={setLineColor}
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
    zIndex: 999,
  },
})

export default AppMenu
