import React, {Component} from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import CurrentLocation from './currentLocation';
import {NavLink} from "react-router-dom"
import Header from './signoutHeader';

/*

     User now can see other users markers
     now the markers get updated on the db
     and a whole lot more

     in the mapContainer we made 2 states props one called locations --> which gets the current marker location,
                                                           userClickedLocations --> which gets all the users markers locations
    
    then in the appDidMount() we fetched two new routes 
            1- main-mapm ---> to get the user marker position
                                we stored the result in this.state.locations
            2- all-users ---> to get all users marker positions
                                we stored the resutls in this.state.userClickedLocations 


    in the render() -->
            we map through all the user locations and returned a marker with the correct name and position
            we rendered a marker with the current click position for the current user

    
    we made an event for the map click -->
            updateMarkers( obj --> which is the current click position value (got from the currentLocation event --> getUserClickLocation ) ) 
                inside it we-->  set the state prop locations to the click position location
                                 we create a body variable and send the new click location to the db


    we made an event inside the currentLocation --> (inside handleMap)
        first of all we check for the boolean clickTimes because of the bug that clicks 5 times
        then we set the state of the current userClickLocation equals to the click position
        then we bind the event to the parent   [this.props.getUserClickLocation(this.state.userClickLocation);]
        then we set a timeOut for a 1 second for the next click to avoide the bug


    we made 3 new routes inside the server.js 
        1- main-map1 (put) --> to update the destination (new) location of the current user
        2- main-map1 (get) --> to get the destination (new) location of the current user
        3- all-users (get) --> to get all the users info (not effectient) why because imagine if you had 1m user in the db
    
*/

// the class tha'll hold our map
class MapContainer extends React.Component {
constructor(props){
  super(props)
    this.state = {
        // if it's already showing one
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        role2:'passenger',
        token: this.props.getTokenFromParent(),
        locations: [],
        userClickedLocations: []
    }
    // console.log();
}

 componentDidMount() {
     fetch("/main-mapm", {
        method: 'get',
        headers: {"Token": this.state.token}
     }).then((data) => data.json())
        .then((acuiredData) => {
            // this.setState({locations:[{lat: acuiredData.location.lat,lng: acuiredData.location.lng}] })})
            // if(this.state.locations.length > 0) console.log(this.state.locations)
            if (acuiredData) {
                this.setState({locations:{lat: acuiredData.user[0].dest_Lat,lng: acuiredData.user[0].dest_Lng}});
                console.log(acuiredData);
            }
            else console.log('no acud data');
        })


    fetch('/all-users').then((data) => data.json()).then((users) => {
        if (users) {
            console.log(users);

            let usersClickedLocations = [];
            users.users.forEach(user => {
                if (user.dest_Lat !== null || user.dest_Lat !== undefined)
                    usersClickedLocations = [...usersClickedLocations, {name: user.username + ' clicked Location', lat: user.dest_Lat, lng: user.dest_Lng}];
            });

            // usersClickedLocations.filter((item) => item.lat !== null);

            if (usersClickedLocations.length > 0) {
                this.setState({
                    userClickedLocations: [...usersClickedLocations]
                });
            }
            // console.log('userclicksLocations');
            // console.log(usersClickedLocations);
            // console.log('loaction state');
            // console.log(this.state.locations);

            // this.setState({
            //     locations:[
            //         ... this.state.locations,

            //     ]
            // })
        } else {
            console.log('no users');
        }
    })
 }

//Callback for the currentLocation to access the token
getTokenFromMap() {
  return this.state.token;
}


//update the passenger role on click
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

updateMarkers(obj) {
    // console.log('From parent im  sayingf asdas hi');
    this.setState({
        //for a lot of markers
        // locations : [...this.state.locations, ({lat: obj.lat, lng: obj.lng})]
        //for a single marker
        locations :  {name:'my newww location', lat: obj.lat, lng: obj.lng}

    });


    //Send to db
    const body = {
        lat: this.state.locations.lat,
        lng: this.state.locations.lng
    }

    console.log(body);
    
    fetch('/main-mapm',{
        method: 'put',
        body:JSON.stringify(body),
        headers: {"Content-Type" : "application/json",
                        "Token": this.state.token}
        
    });
    // console.log(this.state.locations);
}

    onClick() {
        console.log('hi');
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
        let items;
        return (
            <div>
                <Header/>
                <div id='btnBox'>
                  
                    <NavLink to="/driver">
                    <button className='mapB' type="button" >DRIVER</button>
                    </NavLink>
                    <NavLink to="/passenger">
                    <button className='mapB' type ="button" onClick={this.updateP.bind(this)}>PASSENGER</button>
                    </NavLink>
                    {/* <NavLink to='/homepage'>
                    <button id='signout' onClick={this.SignOut.bind(this)} type ="button" >Sign Out</button>
                    </NavLink> */}
                </div>

            {/* //  the current location is the geolocatoin functionality */}
            <CurrentLocation
                getUserClickLocation={this.updateMarkers.bind(this)}
                getTokenFromParentMap={this.getTokenFromMap.bind(this)}
                centerAroundCurrentLocation
                google={this.props.google}
            />
{/* 
            {
                console.log(CurrentLocation)
            } */}

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

         <Marker
                onClick={this.onMarkerClick.bind(this)} 
                name={"Irbid"}
                position ={{
                     lat: 30.3285 ,
                     lng : 35.4444
                }}
            />

        {
            this.state.userClickedLocations.map(location => {
                console.log('item X should render');
                console.log('location', location);
                if (location.length > 0) {
                    {/* console.log('its an arrrrraaay!'); */}
                    {/* location.forEach(location); */}
                }
                return <Marker
                        onClick={this.onMarkerClick.bind(this)}
                        name={location.name}
                        key={location.name + " DB"}
                        position={{
                            lat: location.lat,
                            lng: location.lng
                        }}
                    />
            }
            )

        } 

        
             <Marker
                        onClick={this.onMarkerClick.bind(this)}
                        name={this.state.locations.name}
                        key={this.state.locations.name + " DB"}
                        position={{
                            lat: this.state.locations.lat,
                            lng: this.state.locations.lng
                        }}
                    />
            
        
        {/* Calling the build in InfoWindow component */}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        />
          <div>
          {/* this's what appears in the InfoWindo dialoge box */}
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </div>
  );
}
}
      

export default GoogleApiWrapper({
  apiKey : "AIzaSyCSd2zDkggemBpMYEeEvEo_E4RlQDxd6Po"
})(MapContainer)