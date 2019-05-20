import React, {Component} from 'react';
import {Map, Marker, GoogleApiWrapper } from 'google-maps-react';

// it seems as i've consumed the api's limit ;-;, and now
 // we cant use the map.

class MapOCanaan extends Component {
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
                <button type="button" >DRIVER</button>
                <button type ="button">PASSENGER</button>
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
            </div>
            
        </div>
        )
    }
} 

// not sure 100% what this does
export default GoogleApiWrapper({
    // my maps api
    apiKey: ('AIzaSyCSd2zDkggemBpMYEeEvEo_E4RlQDxd6Po')
})(MapOCanaan); // exporting the map component!!