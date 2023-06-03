import React from 'react'
import { Switch, StyleSheet } from 'react-native'

type LockSwitchProps = {
  isMapLocked: boolean
  onSwitch: (newValue: boolean) => void
}

const LockSwitch: React.FC<LockSwitchProps> = ({ isMapLocked, onSwitch }) => {
  const handleMapLockSwitch = () => {
    onSwitch(!isMapLocked)
  }

  return (
    <Switch
      style={styles.lockSwitch}
      value={isMapLocked}
      thumbColor={isMapLocked ? '#e32d2d' : 'green'}
      onValueChange={handleMapLockSwitch}
    />
  )
}

const styles = StyleSheet.create({
  lockSwitch: {
    zIndex: 98,
    position: 'absolute',
    top: 15,
    right: 90,
    transform: [{ scaleX: 1.3 }, { scaleY: 1 }],
  },
})

export default LockSwitch
