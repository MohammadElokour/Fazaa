import React, {Component} from 'react';
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
    fetch('http://127.0.0.1:9876/driver', {
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