import { Persistable, TypeMap } from '@/state/types'

export type DataSource = {
  saveData: <T extends Persistable>(
    key: T,
    value: TypeMap[T],
  ) => Promise<boolean>
  loadData: <T extends Persistable>(key: T) => Promise<TypeMap[T] | null>
}
