import { LatLng } from 'react-native-maps'

// TODO: possibly, it could be a type instead
export default class RouteData {
  coordinates: LatLng[]
  constructor(coordinates: LatLng[]) {
    this.coordinates = coordinates
  }
}
