import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import Geocode from "react-geocode";
import { style } from "typestyle";

Geocode.setApiKey("AIzaSyAlkP8RNryCUugbHNVGBUNHoIzdgd695s8");
Geocode.enableDebug();

const mapStyles = {
  width: "100%",
  height: "100%",
};

const niceColors = style({
  transition: "color .2s",
  color: "blue",
  $nest: {
    "&:hover": {
      color: "red",
    },
  },
});

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    let url = "https://www.google.com/maps/search/?api=1&query=";
    url += this.props.center.lat;
    url += ",";
    url += this.props.center.lng;

    this.state = {
      showingInfoWindow: true,
      activeMarker: {},
      selectedPlace: {},
      address: "",
      loc: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
        url: url,
      },
      hover: false,
    };
  }

  componentDidMount() {
    Geocode.fromLatLng(this.state.loc.lat, this.state.loc.lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        this.setState({
          address: address ? address : "",
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: this.state.loc.lat,
          lng: this.state.loc.lng,
        }}
      >
        <Marker
          onClick={this.onMarkerClick}
          position={{ lat: this.state.loc.lat, lng: this.state.loc.lng }}
        />
        <InfoWindow
          visible
          position={{
            lat: this.state.loc.lat + 0.0028,
            lng: this.state.loc.lng,
          }}
          onClose={this.onClose}
        >
          <a
            className={niceColors}
            target="_blank"
            href={this.state.loc.url}
            rel="noopener noreferrer"
          >
            <div>{this.state.address} </div>
          </a>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAlkP8RNryCUugbHNVGBUNHoIzdgd695s8",
})(MapContainer);
