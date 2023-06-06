import { DataSource } from '@/state/DataSource'
import AsyncStorageDS from '@/state/AsyncStorageDS'
import { Region } from 'react-native-maps'
import Route from '@/state/model/RouteData'

export type Persistable = Setting | TripData

export const MAP_TYPES = ['satellite', 'standard'] as const
export type MapType = (typeof MAP_TYPES)[number]

// TODO: once finalized, move these to a Settings class
export enum Setting {
  mapType = 'mapType',
  isMapLocked = 'isMapLocked',
  isGeoLocEnabled = 'isGeoLocEnabled',
  mapRegion = 'mapRegion',
  locUpdateInterval = 'locUpdateInterval',
  locUpdateDistance = 'locUpdateDistance',
  lineWidth = 'lineWidth',
  lineColor = 'lineColor',
}

export enum TripData {
  route = 'route',
}

export type TypeMap = {
  [Setting.mapType]: MapType
  [Setting.isMapLocked]: boolean
  [Setting.isGeoLocEnabled]: boolean
  [Setting.mapRegion]: Region
  [Setting.locUpdateInterval]: number
  [Setting.locUpdateDistance]: number
  [Setting.lineWidth]: number
  [Setting.lineColor]: string
  [TripData.route]: Route
}

class Repository {
  dataSource: DataSource
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource
  }

  saveLongTerm = <T extends Persistable>(key: T, value: TypeMap[T]) => {
    // TODO: save it to Realm maybe ??
  }

  saveShortTerm = async <T extends Persistable>(
    key: T,
    value: TypeMap[T],
  ): Promise<boolean> => {
    return this.dataSource.saveData(key, value)
  }

  save = <T extends Persistable>(
    key: T,
    value: TypeMap[T],
  ): Promise<boolean> => {
    return this.saveShortTerm(key, value)
  }

  load = async <T extends Persistable>(key: T): Promise<TypeMap[T] | null> => {
    return await this.dataSource.loadData(key)
  }
}

const dataSource = new AsyncStorageDS()
export const Repo = new Repository(dataSource)
