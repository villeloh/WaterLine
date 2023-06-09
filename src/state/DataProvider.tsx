import React, { Dispatch, createContext, useReducer } from 'react'
import { Persistable, TypeMap, Repo } from '@/state/Repository'
import useAppState from '@/hooks/useAppState.android'

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
    // TODO: ensure that the key potentially not existing doesn't cause any issues
    for (const key in state) {
      const persKey = key as Persistable

      const localData = state[persKey]
      if (!localData) {
        const repoData = (await Repo.load(persKey)) as TypeMap[T]
        if (repoData) {
          // save it into local state
          dispatch({
            type: 'SET_DATA',
            key: persKey,
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
