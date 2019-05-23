import React from "react";
import {NavLink} from "react-router-dom"

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			errorMessage: '',
			token:""
		};
	}
	getPlaces(){
		fetch('http://127.0.0.1:9876/places', {
		  method: 'get',
		  headers: {"Content-Type": "application/json"}
		  // {"x-access-token": token }
		}).then((response) => {
		  return response.json();
		}).then((body) => {
		  console.log(body);
		  if(body.error){
			return this.setState({errorMessage: body.error})
		  };
		  return "hi"
		})
	  }
	  usernameChange(e){
		  this.setState({
			username:e.target.value
		  })
		
	  }
	  passChange(e){
		this.setState({
			password:e.target.value
		  })
	  }
	
	login() {
		console.log(this.state.username,"hi")
		//Call API to sign in with username and password
		const body = {username: this.state.username, password: this.state.password};
		fetch('/login', {
		  method: 'post',
		  body: JSON.stringify(body),
		  headers: {"Content-Type": "application/json"}
		}).then((response) => {
		  return response.json();
		}).then((body) => {
		  if(body.error){
			if(body.error === 'Please sign in'){
			  return this.setState({ username: '', password: '', errorMessage: ''})  
			} else {
			  return this.setState({errorMessage: body.error})
			}
		  }
		  //Got token
		  const token = body.token;
		  const username=body.username
		  localStorage.setItem('token', token);
		  localStorage.setItem('username', username);
		  this.setState({username: '', password: '', errorMessage: ''});
		});
	  }
	
	render() {

		return (
			<div className="sign">
				<div className="user">
					<h1 className="hdr">Login (◕‿◕)♡</h1>
					<form className="form">
						<div className="form__group">
							<input type="text" placeholder="FullName" className="form__input" value={this.state.username} onChange = {this.usernameChange.bind(this)}/>
						</div>

						<div className="form__group">
							<input type="password" placeholder="Password" className="form__input" value={this.state.password} onChange={this.passChange.bind(this)}/>
						</div>
				{/* <NavLink to="/main-map"> */}
						<button className="btn" type="button" onClick={() => this.login()}>
							Login
						</button>
				{/* </NavLink> */}
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
