<<<<<<< HEAD
import React, {Component} from "react";
import ReactDOM from "react-dom";
import { browserHistory} from "react-router";
import { BrowserRouter  , Route, Switch  } from "react-router-dom"


import Header from './componants/Header';
import HomePage from './componants/HomePage';
import SignUp from './componants/SignUp';
import Login from './componants/Login';
import Map from './componants/map'
import map from "./componants/map";

class App extends Component {
 constructor(props){
   super(props)
 
  } 
  
  render(){
    return (
      <BrowserRouter>
        <div>
          <Header/>
              <Route exact path="/" component={HomePage} />
              <Route path="/signup" component={SignUp} />
              <Route path="/homepage" component={HomePage} />
              <Route path="/login" component={Login} />
              <Route path="/main-map" component={map} />
        </div>
      </BrowserRouter>
     
     
      // <Header />
      // <BrowserRouter history={browserHistory}>
      //   <Route path={"/homepage"} Component={HomePage} />
      //   <Route path={"/signup"} Component={SignUp}  />
      // </BrowserRouter>
    //   <div className="App">
    //   <Header/>
    //   <HomePage />
    //   {/* <SignUp /> */}
    //   {/* <Login/> */}
    //   {/* <Map /> */}
    //   <footer className="App-footer" />
    // </div>
    );
  }
}

=======
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import {Router, Route} from 'react-router';
// import { BrowserRouter as Router, Route, broswerHistory } from 'react-router-dom';
import Header from './componants/Header';
import HomePage from './componants/HomePage';
import SignUp from './componants/SignUp';
import Login from './componants/Login';
import Map from './componants/map'

class App extends Component {
 constructor(props){
   super(props)
 this.state={
  page:''
 }
  } 
  
  render(){
    return (
      <div className="App">
      <Header/>
      {/* <Router History={broswerHistory}>
        <Route path={""} component={HomePage} />
        <Route path={"signup"} component={SignUp} />
        <Route path={"login"} component={Login} />
      </Router> */}
      <HomePage />
      {/* <SignUp /> */}
      {/* <Login/> */}
      {/* <Map /> */}
      <footer className="App-footer" />
    </div>
    );
  }
}

>>>>>>> 133302b05379e20356abf6fe5caf32e0c88a0d5f
ReactDOM.render(<App />, document.getElementById('app'));