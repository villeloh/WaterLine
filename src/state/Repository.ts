export type MapType = 'satellite' | 'standard'

export enum Setting {
  mapType = 'mapType',
  isMapLocked = 'isMapLocked',
}

type TypeMap = {
  [Setting.mapType]: MapType
  [Setting.isMapLocked]: boolean
}

class Repository {
  tempData: Map<Setting, TypeMap[keyof TypeMap]> = new Map()

  saveLongTerm = <T extends Setting>(key: T, value: TypeMap[T]) => {
    // TODO:
  }

  saveShortTerm = <T extends Setting>(key: T, value: TypeMap[T]) => {
    this.tempData.set(key, value)
  }

  save = <T extends Setting>(key: T, value: TypeMap[T]) => {
    this.saveShortTerm(key, value)
  }

  load = <T extends Setting>(key: T): TypeMap[T] | undefined => {
    return this.tempData.get(key) as TypeMap[T] | undefined
  }
}

export const Repo = new Repository()
