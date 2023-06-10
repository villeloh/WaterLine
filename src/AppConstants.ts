import { LineCapType, LineJoinType } from 'react-native-maps'
import { MapType } from '@/state/types'

export const AppColors = {
  btnColorPrimary: '#706f6f',
  btnTextColorPrimary: 'white',
  bgGrey: '#dcdee0',
}

export const LocUpdateInterval = {
  min: 1, // seconds
  default: 10,
  max: 60,
}

export const LocUpdateDistance = {
  min: 0,
  default: 0, // meters
  max: 100,
}

export const IsMapLocked = {
  default: true,
}

// Swedish east coast. TODO: ideally, make it user-definable
export const MapRegion = {
  default: {
    latitude: 59.917136332885434,
    longitude: 18.736544754356146,
    latitudeDelta: 1.705026578056625,
    longitudeDelta: 1.7051516845822334,
  },
}

export const DefaultMapType = 'standard' as MapType

export const MapRoute = {
  lineWidth: { min: 1, default: 4, max: 10 },
  lineColor: {
    default: 'orange',
    choices: ['orange', 'red', 'black', 'white'],
  },
  lineCap: 'butt' as LineCapType,
  lineJoin: 'miter' as LineJoinType,
}

export const MapMeasureLine = {
  lineWidth: { default: 4 },
  lineColor: { default: 'purple' },
  markerColor: { default: 'purple' },
  lineCap: 'butt' as LineCapType,
  lineJoin: 'miter' as LineJoinType,
}

export const Marker = {
  color: { default: 'red', selected: 'green' },
}
