export const AppColors = {
  btnColorPrimary: 'blue',
  btnTextColorPrimary: 'white',
}

export const ZoomLevel = {
  min: 1, // relative value
  default: 5,
  max: 10,
}

export const LocUpdateInterval = {
  min: 1, // seconds
  default: 10,
  max: 60,
}

export const LocUpdateDistance = {
  min: 0,
  default: 0, // meters
  max: 100,
}

export const IsMapLocked = {
  default: false,
}

// TODO: make it correspond to the Swedish east coast; ideally, make it user-definable
export const Region = {
  default: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  },
}
