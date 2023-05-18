import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

type MenuItemProps = {
  title: string
  direction?: 'row' | 'column'
  children?: React.ReactNode
}

const styles = StyleSheet.create({
  menuItemRow: {
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

  menuItemColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuItemTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  menuItemBottom: {
    // TODO
  },
})

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  direction = 'row',
  children,
}) => {
  return direction === 'row' ? (
    <View style={styles.menuItemRow}>
      <View style={styles.menuItemLeft}>
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      <View style={styles.menuItemRight}>{children}</View>
    </View>
  ) : (
    <View style={styles.menuItemColumn}>
      <View style={styles.menuItemTop}>
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      <View style={styles.menuItemBottom}>{children}</View>
    </View>
  )
}
export default MenuItem
