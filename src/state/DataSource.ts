import { Setting, TypeMap } from '@/state/Repository'

export type DataSource = {
  saveData: <T extends Setting>(key: T, value: TypeMap[T]) => Promise<boolean>
  loadData: <T extends Setting>(key: T) => Promise<TypeMap[T] | null>
}
