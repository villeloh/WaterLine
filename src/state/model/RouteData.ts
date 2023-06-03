import { LatLng } from 'react-native-maps'

export default class RouteData {
  coordinates: LatLng[]
  constructor(coordinates: LatLng[]) {
    this.coordinates = coordinates
  }
}
