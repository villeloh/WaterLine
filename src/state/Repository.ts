import { DataSource } from '@/state/DataSource'
import AsyncStorageDS from '@/state/AsyncStorageDS'
import { Persistable, TypeMap } from '@/state/types'

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
