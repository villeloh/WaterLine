import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'

type OptionBarProps = {
  options: string[]
}

const OptionBar: React.FC<OptionBarProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            selectedOption === option && styles.buttonSelected,
          ]}
          onPress={() => setSelectedOption(option)}
        >
          <Text style={styles.buttonText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  buttonSelected: {
    backgroundColor: '#bbb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})

export default OptionBar
