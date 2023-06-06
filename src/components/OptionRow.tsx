import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { AppColors } from '@/AppConstants'

type OptionRowProps = {
  options: readonly string[]
  initialSelection: string
  onSelectOption: (option: string) => void
}

const OptionRow: React.FC<OptionRowProps> = ({
  options,
  initialSelection,
  onSelectOption,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(initialSelection)

  const handleSelectOption = (option: string) => {
    setSelectedOption(option)
    onSelectOption(option)
  }

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            selectedOption === option && styles.buttonSelected,
          ]}
          onPress={() => handleSelectOption(option)}
        >
          <Text style={styles.buttonText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

// TODO: it should take itthe bg colors as props
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: AppColors.bgGrey,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 20,
  },
  buttonSelected: {
    backgroundColor: '#52f295',
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

export default OptionRow
