import { useState, useEffect } from 'react'
import { Setting, TypeMap, Repo } from '@/state/Repository'

// a 'spiced up' useState that writes to the db as well as local state
export const useData = <T extends Setting>(
  key: T,
  defaultValue: TypeMap[T],
): [TypeMap[T], (value: TypeMap[T]) => Promise<void>, boolean] => {
  const [data, setData] = useState<TypeMap[T]>(defaultValue)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      const loadedData = await Repo.load(key)
      setData(loadedData ?? defaultValue)
      setIsLoading(false)
    }
    loadData()
  }, [key, defaultValue])

  const saveData = async (value: TypeMap[T]) => {
    setData(value)
    const success = await Repo.save(key, value)
    if (!success) {
      console.error('Failed to save data')
      setData(defaultValue)
    }
  }
  return [data, saveData, isLoading]
}
