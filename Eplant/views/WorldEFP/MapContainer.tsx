import { random } from 'lodash'

import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps'

import WorldEFPIcon from './icon'
import { WorldEFPData, WorldEFPState } from './types'

interface MapContainerProps {
  activeData: WorldEFPData
  state: WorldEFPState
}
const MapContainer = ({ activeData, state }: MapContainerProps) => {
  const position = { lat: 49, lng: 11 }

  console.log(activeData)
  return (
    <APIProvider apiKey={import.meta.env.VITE_MAPS_API_KEY}>
      <Map
        defaultCenter={position}
        defaultZoom={10}
        mapId={import.meta.env.MAP_ID}
      >
        {activeData.positions.map((e, index) => {
          const colour = index === 0 ? 'red' : 'yellow'
          return (
            <AdvancedMarker key={index} position={e}>
              <WorldEFPIcon sx={{ fill: colour }}></WorldEFPIcon>
            </AdvancedMarker>
          )
        })}
      </Map>
    </APIProvider>
  )
}

export default MapContainer
