import { useState } from 'react'
import { Persistable, TypeMap, Repo } from '@/state/Repository'
import useAppState from '@/hooks/useAppState.android'

// a 'spiced up' useState that writes to the Repo as well as local state
// TODO: make it into a singleton (with Context), so that the data can be referenced from anywhere
// TODO: handle errors somehow (maybe retry once and/or show a Toast?)
export const useData = <T extends Persistable>(
  key: T,
  defaultValue: TypeMap[T],
): [TypeMap[T], (value: TypeMap[T]) => Promise<void>, () => void, boolean] => {
  const [data, setData] = useState<TypeMap[T]>(defaultValue)
  const [isLoading, setIsLoading] = useState(true)

  // manual save to repo for special situations
  const saveToRepo = () => {
    Repo.save(key, data)
  }

  const onEnterBackground = () => {
    saveToRepo()
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

  return [data, saveData, saveToRepo, isLoading]
}
