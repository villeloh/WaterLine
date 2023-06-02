import { DataSource } from '@/state/DataSource'
import AsyncStorageDS from '@/state/AsyncStorageDS'

export type MapType = 'satellite' | 'standard'

export enum Setting {
  mapType = 'mapType',
  isMapLocked = 'isMapLocked',
}

export type TypeMap = {
  [Setting.mapType]: MapType
  [Setting.isMapLocked]: boolean
}

class Repository {
  dataSource: DataSource
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource
  }

  tempData: Map<Setting, TypeMap[keyof TypeMap]> = new Map()

  saveLongTerm = <T extends Setting>(key: T, value: TypeMap[T]) => {
    // TODO:
  }

  saveShortTerm = async <T extends Setting>(
    key: T,
    value: TypeMap[T],
  ): Promise<boolean> => {
    return this.dataSource.saveData(key, value)
  }

  save = <T extends Setting>(key: T, value: TypeMap[T]) => {
    this.saveShortTerm(key, value)
  }

  load = async <T extends Setting>(key: T): Promise<TypeMap[T] | null> => {
    return await this.dataSource.loadData(key)
  }
}

const dataSource = new AsyncStorageDS()
export const Repo = new Repository(dataSource)
