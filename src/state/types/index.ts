import { LatLng, Region } from 'react-native-maps'
import { Setting } from 'state/types/Setting'
import { TripData } from 'state/types/TripData'
import { Persistable, PersistableKeys } from 'state/types/Persistable'
import { MapType, MAP_TYPES } from 'state/types/MapType'
import RouteData from 'state/model/RouteData'

// TODO: figure out a way to get rid of this
type TypeMap = {
  [Setting.mapType]: MapType
  [Setting.isMapLocked]: boolean
  [Setting.isGeoLocEnabled]: boolean
  [Setting.mapRegion]: Region
  [Setting.locUpdateInterval]: number
  [Setting.locUpdateDistance]: number
  [Setting.lineWidth]: number
  [Setting.lineColor]: string
  [TripData.route]: RouteData
  [TripData.measureLineEndCoord]: LatLng | null
}

export {
  type TypeMap,
  type Persistable,
  PersistableKeys, // TODO: does it need to exist ?
  type MapType,
  Setting,
  TripData,
  MAP_TYPES,
  RouteData,
}
