import React, { useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import Danger from "components/Typography/Danger";


function ItemMarker(props) {

  const [isOpen, setOpen] = useState(false);

  return (
    <Marker
      position={{ lat: props.item.coords.lat, lng: props.item.coords.lng }}
      onClick={() => setOpen(!isOpen)}
    >
      {isOpen ? (
        <InfoWindow onCloseClick={() => setOpen(!isOpen)}>
          <>
            <h4 style={{ marginBottom: "4px" }}>
              <b>{props.item.item.name}</b>
            </h4>
            <a
              target="_blank"
              href={props.item.item.address.google_map_link}
            >{`${props.item.item.address.address}, ${props.item.item.address.city}, ${props.item.item.address.state}, ${props.item.item.address.zip}`}</a>
            <Danger>
              <p>{"$" + props.item.item.price}</p>
            </Danger>
          </>
        </InfoWindow>
      ) : (
        ""
      )}
    </Marker>
  );

}

export default function MultiMap(props) {
  //const mapsApi = process.env.REACT_APP_GOOGLE_API_KEY;
  const mapsApi = process.env.REACT_APP_TEMP_GOOGLE_KEY;
  const mapsUrl = "https://maps.googleapis.com/maps/api/js?key=";

  const coords = props.coords;

  const CustomSkinMap = withGoogleMap(() => (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: coords[0].coords.lat, lng: coords[0].coords.lng }}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true,
        styles: [
          {
            featureType: "water",
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: "#0088ff" },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }],
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }],
          },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }],
          },
          { featureType: "poi.park", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }],
          },
          { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }],
          },
        ],
      }}
    >
        { 
          coords.map((item) => <ItemMarker item={item} />) 
        }
    </GoogleMap>
  ));

  return (
    <CustomSkinMap
      googleMapURL={`${mapsUrl}${mapsApi}`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `80vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
}
