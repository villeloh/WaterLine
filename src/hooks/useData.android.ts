import { useState } from 'react'
import { Persistable, TypeMap, Repo } from '@/state/Repository'
import useAppState from '@/hooks/useAppState.android'

// a 'spiced up' useState that writes to the db as well as local state
export const useData = <T extends Persistable>(
  key: T,
  defaultValue: TypeMap[T],
): [TypeMap[T], (value: TypeMap[T]) => Promise<void>, boolean] => {
  const [data, setData] = useState<TypeMap[T]>(defaultValue)
  const [isLoading, setIsLoading] = useState(true)

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
