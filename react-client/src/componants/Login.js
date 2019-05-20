<<<<<<< HEAD
import React from "react";
import {NavLink} from "react-router-dom"

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="sign">
				<div className="user">
					<h1 className="hdr">Login (◕‿◕)♡</h1>
					<form className="form">
						<div className="form__group">
							<input type="text" placeholder="FullName" className="form__input" />
						</div>

						<div className="form__group">
							<input type="password" placeholder="Password" className="form__input" />
						</div>
				<NavLink to="/main-map">
						<button className="btn" type="button">
							Login
						</button>
				</NavLink>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
=======
import React from 'react';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		
		};
	}
	render() {
		return (
			<div className="sign">
				<div className="user">
					<h1 className="hdr">Login (◕‿◕)♡</h1>
					<form className="form">
						<div className="form__group">
							<input type="text" placeholder="FullName" className="form__input" />
						</div>

						<div className="form__group">
							<input type="password" placeholder="Password" className="form__input" />
						</div>

						<button className="btn" type="button">
							Login
						</button>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
>>>>>>> 133302b05379e20356abf6fe5caf32e0c88a0d5f
