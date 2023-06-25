import { LineCapType, LineJoinType } from 'react-native-maps'
import { MapType, RouteData, Setting, TripData, TypeMap } from '@/state/types'

export const AppColors = {
  btnColorPrimary: '#706f6f',
  btnTextColorPrimary: 'white',
  bgGrey: '#dcdee0',
}

export const LocUpdateInterval = {
  min: 1, // seconds
  default: 10,
  max: 120,
}

export const LocUpdateDistance = {
  min: 0,
  default: 10, // meters
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

// TODO: sort out the different type variables etc; are all really needed ?
// NOTE: it's arguable whether this should be defined here, but it's convenient and these values are constant for all intents and purposes
type DefaultValues = { [K in keyof TypeMap]: TypeMap[K] }
export const DEFAULT_APP_SETTINGS: DefaultValues = {
  [Setting.mapType]: DefaultMapType,
  [Setting.isMapLocked]: IsMapLocked.default,
  [Setting.isGeoLocEnabled]: false,
  [Setting.mapRegion]: MapRegion.default,
  [Setting.locUpdateInterval]: LocUpdateInterval.default,
  [Setting.locUpdateDistance]: LocUpdateDistance.default,
  [Setting.lineWidth]: MapRoute.lineWidth.default,
  [Setting.lineColor]: MapRoute.lineColor.default,
  [TripData.route]: new RouteData([]),
  [TripData.measureLineEndCoord]: null,
}
