import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Menu, MenuItem, UIButton, UISlider, ColorRow } from 'components'
import { MapTypeOptions } from 'ui'
import { useData } from 'hooks'
import { Setting as S, MAP_TYPES, MapType } from 'state/types/'
import {
  MapRoute as MR,
  LocUpdateInterval as LocUI,
  LocUpdateDistance as LocUD,
} from 'AppConstants'

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

  const [locUpdateInterval, setLocUpdateInterval] = useData(S.locUpdateInterval)
  const [locUpdateDistance, setLocUpdateDistance] = useData(S.locUpdateDistance)
  const [mapType, setMapType] = useData(S.mapType)
  const [lineWidth, setLineWidth] = useData(S.lineWidth)
  const [lineColor, setLineColor] = useData(S.lineColor)

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
        <MenuItem title={'Update distance:'} direction={'column'}>
          <UISlider
            minValue={LocUD.min}
            maxValue={LocUD.max}
            initialValue={locUpdateDistance}
            unit={'m'}
            onValueChange={setLocUpdateDistance}
          />
        </MenuItem>
        <MenuItem title={'Update interval:'} direction={'column'}>
          <UISlider
            minValue={LocUI.min}
            maxValue={LocUI.max}
            unit={'s'}
            initialValue={locUpdateInterval}
            onValueChange={setLocUpdateInterval}
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
