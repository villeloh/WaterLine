import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Menu from '@/components/menu/Menu'
import MenuItem from '@/components/menu/MenuItem'
import UIButton from '@/components/UIButton'
import { MAP_TYPES, MapType, Setting as S } from '@/state/Repository'
import { MapRoute as MR } from '@/AppConstants'
import MapTypeOptions from '@/ui/MapTypeOptions'
import UISlider from '@/components/UISlider'
import ColorRow from '@/components/ColorRow'

type AppMenuProps = {
  onOpen: () => void
  onClose: () => void
  mapProps: {
    mapType: MapType
    setMapType: (newType: MapType) => void
    lineWidth: number
    setLineWidth: (newWidth: number) => void
    lineColor: string
    setLineColor: (newColor: string) => void
  }
}

const AppMenu: React.FC<AppMenuProps> = ({ onOpen, onClose, mapProps }) => {
  const [isOpen, setIsOpen] = useState(false)

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
        <MenuItem title={'Map Type:  '} direction={'row'}>
          {/* TODO: rather than props, give it state via a singleton form of useData() */}
          <MapTypeOptions
            options={MAP_TYPES}
            initialSelection={mapProps.mapType}
            onSelectOption={(option: string) =>
              mapProps.setMapType(option as MapType)
            }
          />
        </MenuItem>
        <MenuItem title={'Line width:'} direction={'column'}>
          <UISlider
            minValue={MR.lineWidth.min}
            maxValue={MR.lineWidth.max}
            initialValue={mapProps.lineWidth}
            onValueChange={mapProps.setLineWidth}
          />
        </MenuItem>
        <MenuItem title={'Line color:'} direction={'column'}>
          <ColorRow
            colors={MR.lineColor.choices}
            initialChoice={mapProps.lineColor}
            onValueChange={mapProps.setLineColor}
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
