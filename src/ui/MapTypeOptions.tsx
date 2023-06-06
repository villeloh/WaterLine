import React from 'react'
import OptionRow from '@/components/OptionRow'
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
    <OptionRow
      options={options}
      initialSelection={initialSelection}
      onSelectOption={onSelectOption}
    />
  )
}

export default MapTypeOptions
