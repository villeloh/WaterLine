import { LineCapType, LineJoinType } from 'react-native-maps'
import { MapType } from './state/Repository'

export const AppColors = {
  btnColorPrimary: 'blue',
  btnTextColorPrimary: 'white',
}

export const ZoomLevel = {
  min: 1, // relative value
  default: 5,
  max: 10,
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

// TODO: make it correspond to the Swedish east coast; ideally, make it user-definable
export const MapRegion = {
  default: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  },
}

export const DefaultMapType = 'standard' as MapType

export const MapRoute = {
  lineWidth: 3, // px
  lineColor: 'orange',
  lineCap: 'butt' as LineCapType,
  lineJoin: 'miter' as LineJoinType,
}
