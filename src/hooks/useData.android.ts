import { useState, useContext, useEffect } from 'react'
import { DataContext } from '@/state/DataProvider'
import { Persistable, TypeMap, Repo } from '@/state/Repository'

// a 'spiced up' useState that writes to the Repo as well as local state.
// Works as a global datastore; a 'mini-Redux' of sorts
// TODO: handle errors somehow (maybe retry once and/or show a Toast?)
export const useData = <T extends Persistable>(
  key: T,
  defaultValue: TypeMap[T],
): [TypeMap[T], (value: TypeMap[T]) => void, () => void, boolean] => {
  const contextValue = useContext(DataContext)
  if (!contextValue) {
    // Handle the error when DataContext is not available
    throw new Error('DataContext must be used within a DataProvider')
  }

  const [isLoading, setIsLoading] = useState(true)
  const { state, dispatch } = contextValue

  useEffect(() => {
    if (!state[key]) {
      dispatch({ type: 'SET_DATA', key, payload: defaultValue })
    }
    setIsLoading(false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const setData = (value: TypeMap[T]) => {
    dispatch({ type: 'SET_DATA', key, payload: value })
  }

  // direct save to Repo for special situations
  const persistData = () => {
    const value = state[key]
    if (value) {
      Repo.save(key, value)
    }
  }

  return [state[key] ?? defaultValue, setData, persistData, isLoading]
}
