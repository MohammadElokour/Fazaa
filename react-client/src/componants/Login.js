import React from "react";
// import {NavLink} from "react-router-dom"

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
onchange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
	
	login() {
		//Call API to sign in with username and password
		const body = {username: this.state.username, password: this.state.password};
		fetch('http://127.0.0.1:9876/login', {
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
			localStorage.setItem('token',token);
			console.log(token);
		  this.setState({username: '', password: '', errorMessage: ''});
		  this.getPlaces();
		});
	  }
	
	render() {

		return (
			<div className="sign">
				<div className="user">
					<h1 className="hdr">Login (◕‿◕)♡</h1>
					<form className="form">
						<div className="form__group">
							<input type="text" name="username" placeholder="FullName" className="form__input" value={this.state.usernames} onChange={this.onchange.bind(this)}/>
						</div>

						<div className="form__group">
							<input type="password" name="password" placeholder="Password" className="form__input" value={this.state.passwords} onChange={this.onchange.bind(this)} />
						</div>
				<NavLink to="/main-map">
						<button className="btn" type="button" onClick={() => this.login()}>
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
