import React from 'react'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Map = (props) => {
  return <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: props.latitude, lng: props.longitude }}
  >
    <Marker position={{ lat: props.latitude, lng: props.longitude}} />
  </GoogleMap>
}

export default compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDN5fR4flz3094-ZFSKawenqq0Uc7IM4Ks&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(Map);