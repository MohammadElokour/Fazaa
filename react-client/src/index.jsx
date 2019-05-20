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

ReactDOM.render(<App />, document.getElementById('app'));