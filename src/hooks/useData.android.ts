import { useState } from 'react'
import { Persistable, TypeMap, Repo } from '@/state/Repository'
import useAppState from '@/hooks/useAppState.android'

// a 'spiced up' useState that writes to the db as well as local state
// TODO: make it into a singleton (with Context), so that the data can be referenced from anywhere
export const useData = <T extends Persistable>(
  key: T,
  defaultValue: TypeMap[T],
): [TypeMap[T], (value: TypeMap[T]) => Promise<void>, boolean] => {
  const [data, setData] = useState<TypeMap[T]>(defaultValue)
  const [isLoading, setIsLoading] = useState(true)

  // TODO: figure out how to save data to the db intermittently
  const onEnterBackground = () => {
    Repo.save(key, data)
  }

  const onEnterForeground = async () => {
    setIsLoading(true)
    const loadedData = await Repo.load(key)
    setData(loadedData ?? defaultValue)
    setIsLoading(false)
  }
  useAppState(onEnterForeground, onEnterBackground)

  const saveData = async (value: TypeMap[T]) => {
    setData(value)
  }

  return [data, saveData, isLoading]
}
