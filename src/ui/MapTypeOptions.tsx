import React from 'react'
import OptionBar from '@/components/OptionBar'
import { MAP_TYPES, MapType } from '@/state/Repository'

type MapTypeOptionsProps = {
  options: typeof MAP_TYPES
  initialSelection: MapType
}

const MapTypeOptions: React.FC<MapTypeOptionsProps> = ({
  options,
  initialSelection,
}) => {
  return <OptionBar options={options} initialSelection={initialSelection} />
}

export default MapTypeOptions
