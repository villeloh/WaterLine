import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

type MenuItemProps = {
  title: string
  children?: React.ReactNode
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 16,
  },
  menuItemRight: {
    // TODO
  },
})

const MenuItem: React.FC<MenuItemProps> = ({ title, children }) => {
  return (
    <View style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      <View style={styles.menuItemRight}>{children}</View>
    </View>
  )
}
export default MenuItem
