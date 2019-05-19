import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Header from './componants/Header';
import HomePage from './componants/HomePage';
import SignUp from './componants/SignUp';
import Login from './componants/Login';
import Map from './componants/map'

class App extends Component {
 constructor(props){
   super(props)
 
  } 
  
  render(){
    return (
      <div className="App">
      <Header/>
      {/* <HomePage /> */}
      {/* <SignUp /> */}
      {/* <Login/> */}
      <Map />
      <footer className="App-footer" />
    </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));