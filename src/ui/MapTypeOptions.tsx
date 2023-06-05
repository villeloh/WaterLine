import React from 'react'
import OptionBar from '@/components/OptionBar'
import { MAP_TYPES, MapType } from '@/state/Repository'

type MapTypeOptionsProps = {
  options: typeof MAP_TYPES
  initialSelection: MapType
  onSelectOption: (option: string) => void
}

const MapTypeOptions: React.FC<MapTypeOptionsProps> = ({
  options,
  initialSelection,
  onSelectOption,
}) => {
  return (
    <OptionBar
      options={options}
      initialSelection={initialSelection}
      onSelectOption={onSelectOption}
    />
  )
}

export default MapTypeOptions
