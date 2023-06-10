import { useEffect, useState } from 'react'
import { AppState, AppStateStatus } from 'react-native'

const useAppState = (
  onEnterForeground: () => void,
  onEnterBackground: () => void,
) => {
  const [appState, setAppState] = useState(AppState.currentState)

  // initial data load
  useEffect(() => {
    if (appState === 'active') {
      onEnterForeground()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        onEnterForeground()
      } else if (
        appState === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        onEnterBackground()
      }
      setAppState(nextAppState)
    }

    const sub = AppState.addEventListener('change', handleAppStateChange)

    return () => {
      sub.remove()
    }
  }, [appState, onEnterForeground, onEnterBackground])

  return appState
}

export default useAppState
