import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { browserHistory} from "react-router";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './componants/Header';
import HomePage from './componants/HomePage';
import SignUp from './componants/SignUp';
import Login from './componants/Login';
import { unregister } from './componants/Interceptor';
import Map from './componants/map';
import map from './componants/map';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			whatPageToShow: 'Homepage',
		};
	}

	render() {
		return (
			<BrowserRouter>
				<div>
					<Header />
					<Route exact path="/" component={HomePage} />
					<Route path="/signup" component={SignUp} />
					<Route path="/homepage" component={HomePage} />
					<Route path="/login" component={Login} />
					{/* <Route path="/main-map" component={map} /> */}
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

ReactDOM.render(<App />, document.getElementById('app'));
