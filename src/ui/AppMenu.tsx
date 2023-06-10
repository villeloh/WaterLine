import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Menu, MenuItem, UIButton, UISlider, ColorRow } from '@/components'
import { MapTypeOptions } from '@/ui'
import { useData } from '@/hooks'
import { Setting as S, MAP_TYPES, MapType } from '@/state/types/'
import { MapRoute as MR, DefaultMapType } from '@/AppConstants'

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
