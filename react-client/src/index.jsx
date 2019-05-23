import React, {Component} from "react";
import ReactDOM from "react-dom";
// import { browserHistory} from "react-router";
import { BrowserRouter  , Route, Switch  } from "react-router-dom"


import Header from './componants/Header';
import HomePage from './componants/HomePage';
import SignUp from './componants/SignUp';
import Login from './componants/Login';
import {unregister} from './componants/Interceptor'
import Map from "./componants/map";
import Driver from "./componants/driver-page"
import About from "./componants/about"

class App extends Component {
 
  constructor(props){
   super(props)
   this.state={
    whatPageToShow: 'Homepage',
    errorMessage: '',
    token: null
   };
  }
   // somefunction = () => {

  // }

  loginCallBack(data) {
      this.setState({
          token: data
        });
      // console.log('Gettttting tooooookkkeeen: ' + data);
  }

  getToken(){
    return this.state.token;
  }
 
  // loginCallBack(data ="dada")
  render(){
    return (
      <div>
      <BrowserRouter>
        <div>
          <Header/>
              <Route exact path="/" component={HomePage} />
              <Route path="/signup" component={SignUp} />
              <Route path="/homepage" component={HomePage} />
              {/* <Route path="/login" component={Login} /> */}
              <Route path="/login" render={
                () => <Login
                    callBack={this.loginCallBack.bind(this)} />
                
              } />
              {/* <Route path="/main-map" component={map} /> */}
              <Route path="/main-map" render={
                () => <Map
                    getTokenFromParent={this.getToken.bind(this)} />
                
              } />
              <Route path="/about" component={About}/>
              <Route path="/driver" component={Driver} />
        </div>
      </BrowserRouter>
     
      </div>
      

      

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

ReactDOM.render(<App />, document.getElementById('app'));