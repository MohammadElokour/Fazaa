
import React, {Component} from 'react';
<<<<<<< HEAD
import {Map, Marker, GoogleApiWrapper } from 'google-maps-react';

// it seems as i've consumed the api's limit ;-;, and now
 // we cant use the map.

class MapOCanaan extends Component {
    constructor(props){
        super(props)
        this.state={
            role1:'driver',
            role2:'passenger'
        }
    }

    updateD(){
        var username = localStorage.getItem('username')
        console.log(username,'hey',localStorage,this.state.role1)
        const body = {role: this.state.role1,username:username};
    fetch('http://127.0.0.1:9876/driverUpdate', {
      method: 'put',
      body: JSON.stringify(body),
      headers: {"Content-Type": "application/json"}
    }).then((response) => {
      return response.text();
    })
    }

    updateP(){
        var username = localStorage.getItem('username')
        console.log(username,'hey',localStorage,this.state.role2)
        const body = {role2: this.state.role2,username:username};
    fetch('http://127.0.0.1:9876/passenger', {
      method: 'put',
      body: JSON.stringify(body),
      headers: {"Content-Type": "application/json"}
    }).then((response) => {
      return response.text();
    })
    }

    render () {
        //the map's style
        const style = {
            width:'450px',
            height: '450px',
        }
        return (
        <div>
            <div className="Mapo">
                BEHOLD ! OUR MAAP~~~!<br/>
            {/* style these buttons, i added them to see if they work! */}
                <button className='mapB' type="button" onClick={this.updateD.bind(this)}>DRIVER</button>
                <button className='mapB' type ="button" onClick={this.updateP.bind(this)}>PASSENGER</button>
                <Map
                google = {this.props.google}
                // the zoom level
                zoom={15}
                // the location, it's amman !
                initialCenter = {{
                    lat: 31.9454,
                    lng: 35.9284
                }}
                // applying the styling
                style = {style}
                />
                {/* <button type="button" onClick={this.update.bind(this)}>driver</button> */}
=======
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
>>>>>>> 025aa830b729e75cd03bd38474ca248825a70f34
            </div>
    );
  }
}
        

export default GoogleApiWrapper({
    apiKey : "AIzaSyCSd2zDkggemBpMYEeEvEo_E4RlQDxd6Po"
})(MapContainer)