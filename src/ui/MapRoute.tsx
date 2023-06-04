import React from 'react'
import { Polyline } from 'react-native-maps'
// NOTE: had to modify the library to export it; be careful with updates !!!
import { PolylinePressEvent } from 'react-native-maps/lib/MapPolyline'
import { MapRoute as MR } from '@/AppConstants'
import RouteData from '@/state/model/RouteData'
import MapMarker from './MapMarker'

type MapRouteProps = {
  isEditable: boolean
  routeData: RouteData
  onPress?: (event: PolylinePressEvent) => void
}

const MapRoute: React.FC<MapRouteProps> = ({
  routeData,
  isEditable,
  onPress,
}) => {
  return (
    <>
      <Polyline
        coordinates={routeData.coordinates}
        tappable={isEditable}
        onPress={onPress}
        strokeWidth={MR.lineWidth}
        strokeColor={MR.lineColor}
        lineCap={MR.lineCap}
        lineJoin={MR.lineJoin}
        geodesic={false} // Google Maps uses Mercator, so it should make sense
      />
      {routeData.coordinates.map((coord, index) => (
        <MapMarker
          key={index}
          id={'' + index}
          location={coord}
          isDraggable={isEditable}
          isTappable={true}
        />
      ))}
    </>
  )
}

export default MapRoute
