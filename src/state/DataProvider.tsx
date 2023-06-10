import React, { Dispatch, createContext, useReducer } from 'react'
import { Repo } from '@/state/Repository'
import { Persistable, PersistableKeys, TypeMap } from '@/state/types'
import { useAppState } from '@/hooks'

// '?' signifies that the keys are optional
type State = { [K in Persistable]?: TypeMap[K] }

type Action<K extends Persistable = Persistable> = {
  type: 'SET_DATA'
  key: K
  payload: TypeMap[K]
}

type DataProviderProps = {
  children: React.ReactNode
}

// somehow updates the local state
const dataReducer = <K extends Persistable = Persistable>(
  state: State,
  action: Action<K>,
): State => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, [action.key]: action.payload }
    default:
      throw new Error('Error saving data (in dataReducer)')
  }
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [state, dispatch] = useReducer(dataReducer, {})

  const onEnterForeground = async <T extends Persistable>() => {
    // upon app restart, the local state is empty, so we have to check every key
    for (const key of PersistableKeys) {
      const localData = state[key as Persistable]

      if (!localData) {
        const repoKey = PersistableKeys[key as keyof typeof PersistableKeys]
        const repoData = (await Repo.load(repoKey as Persistable)) as TypeMap[T]
        if (repoData) {
          // save it into local state
          dispatch({
            type: 'SET_DATA',
            key: repoKey as Persistable,
            payload: repoData,
          })
        }
      }
    }
  }

  const onEnterBackground = () => {
    for (const key in state) {
      const persKey = key as Persistable
      const value = state[persKey]
      if (value) {
        Repo.save(persKey, value)
      }
    }
  }

  useAppState(onEnterForeground, onEnterBackground)

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  )
}

type DataContextType = {
  state: State
  dispatch: Dispatch<Action>
}

export const DataContext = createContext<DataContextType | undefined>(undefined)
