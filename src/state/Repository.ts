import { DataSource } from '@/state/DataSource'
import AsyncStorageDS from '@/state/AsyncStorageDS'
import { Region } from 'react-native-maps'

export type MapType = 'satellite' | 'standard'

// TODO: once finalized, move these to a Settings class
export enum Setting {
  mapType = 'mapType',
  isMapLocked = 'isMapLocked',
  isGeoLocEnabled = 'isGeoLocEnabled',
  region = 'region',
  zoomLevel = 'zoomLevel',
  locUpdateInterval = 'locUpdateInterval',
  locUpdateDistance = 'locUpdateDistance',
}

export type TypeMap = {
  [Setting.mapType]: MapType
  [Setting.isMapLocked]: boolean
  [Setting.isGeoLocEnabled]: boolean
  [Setting.region]: Region
  [Setting.zoomLevel]: number
  [Setting.locUpdateInterval]: number
  [Setting.locUpdateDistance]: number
}

class Repository {
  dataSource: DataSource
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource
  }

  tempData: Map<Setting, TypeMap[keyof TypeMap]> = new Map()

  saveLongTerm = <T extends Setting>(key: T, value: TypeMap[T]) => {
    // TODO: save it to Realm maybe ??
  }

  saveShortTerm = async <T extends Setting>(
    key: T,
    value: TypeMap[T],
  ): Promise<boolean> => {
    return this.dataSource.saveData(key, value)
  }

  save = <T extends Setting>(key: T, value: TypeMap[T]): Promise<boolean> => {
    return this.saveShortTerm(key, value)
  }

  load = async <T extends Setting>(key: T): Promise<TypeMap[T] | null> => {
    return await this.dataSource.loadData(key)
  }
}

const dataSource = new AsyncStorageDS()
export const Repo = new Repository(dataSource)
