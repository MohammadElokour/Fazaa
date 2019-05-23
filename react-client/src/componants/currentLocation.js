import React, {Component} from 'react';
import ReactDOM from 'react-dom'

// the map's style
const mapStyles = {
    map: {
        position: 'absolute',
        width: '100%',
        height: "100%"
    }
};

// All of this is for the Geolocation functionality
class CurrentLocation extends React.Component {
    constructor(props) {
        super(props);

        const {lat, lng} = this.props.initialCenter;
        this.state = {
            CurrentLocation: {
                lat: lat,
                lng: lng
            }
        };
    }
    // checking if the map loaded
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.google !== this.props.google) {
            this.loadMap();
        }
        // checking if the curent device's location is provided,
         // the centering the map to it
        if (prevState.CurrentLocation !== this.state.CurrentLocation) {
            this.recenterMap();
        }
    }

    // this function will recenter the map to the Currentlocation
    recenterMap() {
        const map = this.map;
        const current = this.state.CurrentLocation;

        const google = this.props.google;
        const maps = google.maps;

        if(map) {
            let center = new maps.LatLng(current.lat, current.lng);
            map.panTo(center)
        }
    }

    // now if the map has already loaded
    componentDidMount() {
        // i've no idea whats centerAroundCurrentLocation
        if(this.props.centerAroundCurrentLocation) {
            // check if the Google's Navigator and the geolocation of said navigator 
            if (navigator && navigator.geolocation) {
                // this gets the device's current geolocation and sets it
                navigator.geolocation.getCurrentPosition(pos => {
                    const coords = pos.coords;
                    this.setState({
                        CurrentLocation: {
                            lat:coords.latitude,
                            lng: coords.longitude
                        }
                    });
                });
            }
        }
        // this loads the map
        this.loadMap();
    }

    // the load map function
    loadMap() {
        if (this.props && this.props.google) {
            console.log(this.props)
            const {google} = this.props;
            const maps = google.maps;
            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let {zoom} = this.props;
            const {lat, lng } = this.state.CurrentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign(
                {},
                {
                    center: center,
                    zoom:zoom
                }
            );

            // maps.Map() is contructor that instantiates the map
            this.map = new maps.Map(node, mapConfig);
        }

              
        const body = {
            Loc_Lat: this.state.CurrentLocation.lat,
            Loc_Lng: this.state.CurrentLocation.lng
        };

        // console.log('Fetching!');
        fetch('/main-map', {
            method: 'put',
            body:JSON.stringify(body),
            headers: {"Content-Type" : "application/json",
                        "Token": this.props.getTokenFromParentMap()}
        });

        /*
            * Fixed Login
            * Fixed Database Update
        
            - Created a login Callback for the communication between the login and index { Parent }
            - Rewritten how we render the Route in index.js to pass the callback to the login
            - Called the callBack function insdie the login page and passed the token to it ( that made the parent aware of the token )
            - Created a map callBack for the token and Rewritten the route render in index.js to pass the route
            - Created a currentLocation callBack for the token and passed the data from the map to the fetch function to update the db

        */

    }


    renderChildren() {
        const {children} = this.props;
        // console.log(children)

        if(!children) return;
        
        // const body = {
        //     Loc_Lat: this.state.CurrentLocation.lat,
        //     Loc_Lng: this.state.CurrentLocation.lng
        // };

        // // console.log('Fetching!');
        // fetch('http://127.0.0.1:9876/main-map', {
        //     method: 'put',
        //     body:JSON.stringify(body),
        //     headers: {"Content-Type" : "application/json"}
        // });

        // console.log(body);

        return React.Children.map(children, c => {
            if(!c) return;
            return React.cloneElement(c, {
                map: this.map,
                google:this.props.google,
                mapCenter: this.state.CurrentLocation
            });
        });
    }

    render() {
        const style = Object.assign({}, mapStyles.map);

      return (
          <div>
              <div style={style} ref="map">
                  Loading ୧☉□☉୨
              </div>
              {this.renderChildren()}
          </div>
      );
    }

}

export default CurrentLocation;

CurrentLocation.defaultProps = {
    zoom: 12,
    initialCenter: {
        lat: 31.9454,
        lng: 35.9284
    },
    centerAroundCurrentLocation: false,
    visible: true
}; 