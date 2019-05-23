
import React, {Component} from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import CurrentLocation from './currentLocation';
import {NavLink} from "react-router-dom"


// the class tha'll hold our map
class MapContainer extends React.Component {
constructor(props){
  super(props)
    this.state = {
        // if it's already showing one
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    }

}

    // the function that'll run when you click on the marker
    onMarkerClick(props, marker, e){
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    }       // when you close the marker's infoWindow
            onClose (props){
                if(this.state.showingInfoWindow) {
                    this.setState({
                        showingInfoWindow: false,
                        activeMarker:null
                    })
                }
            }

    render() {
        return (
            <div>
                <div>
                <br />
                <br />
                <br />
                <br />
                <NavLink to="/driver">
                    <button type="button" >DRIVER</button>
                </NavLink>
                <button type ="button">PASSENGER</button>
            </div>

            //  the current location is the geolocatoin functionality
            <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
                >

        {/* a custom placed marker that shows the device's current location  */}
        <Marker onClick={this.onMarkerClick.bind(this)} name={'current location'} />
        {/* a custom marker that'll show Amman */}
        <Marker
                onClick={this.onMarkerClick.bind(this)} name={'you dare ?...YOU DARE !!!'}
                position={{
                    lat: 31.9454,
                    lng: 35.9284
                }}
            />
            {/* a custom marker that'll show Irbid */}
        <Marker
                onClick={this.onMarkerClick.bind(this)} 
                name={"Irbid"}
                position ={{
                     lat: 32.5570 ,
                     lng : 35.8479
                }}
            />
        {/* Calling the build in InfoWindow component */}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
          {/* this's what appears in the InfoWindo dialoge box */}
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </CurrentLocation>
            </div>
    );
  }
}
        

export default GoogleApiWrapper({
    apiKey : "AIzaSyCSd2zDkggemBpMYEeEvEo_E4RlQDxd6Po"
})(MapContainer)