import { useContext } from 'react'
import { DataContext } from '@/state/DataProvider'
import { Persistable } from '@/state/types'
import { Repo } from '@/state/Repository'

const usePersist = () => {
  const dataContext = useContext(DataContext)
  if (!dataContext) {
    throw new Error('usePersist() must be used within a DataProvider')
  }
  const { state } = dataContext

  const persistAll = () => {
    for (const key in state) {
      const persKey = key as Persistable
      const value = state[persKey]
      if (value) {
        Repo.save(persKey, value)
      }
    }
  }

  return persistAll
}

export default usePersist
