import { LatLng } from 'react-native-maps'

export const assertNever = (x: never): never => {
  throw new Error('Unexpected object: ' + x)
}

export type Actions = {
  [key: string]: (arg: any) => any
}

export const pickAction = <T extends keyof Actions>(
  target: T,
  actions: Actions,
  arg: any,
): any => {
  const action = actions[target]

  if (action) {
    return action(arg)
  } else {
    throw new Error(`Invalid target: ${target}`)
  }
}

export const isValidStartCoord = (startCoord: LatLng | null) => {
  return startCoord && startCoord.latitude !== 0 && startCoord.longitude !== 0
}
