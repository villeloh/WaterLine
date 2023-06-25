import React from 'react'
import { MAP_TYPES, MapType } from 'state/types'
import { OptionRow } from 'components'

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
