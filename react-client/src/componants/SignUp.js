import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			errorMessage: '',
		};
	}

	onChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({ [name]: value });
	}

	postSignUp() {
		const body = { username: this.state.username, email: this.state.email, password: this.state.password };
		fetch('/signup', {
			method: 'post',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' },
		})
			.then(response => {
				return response.text();
			})
			.then(textReply => {
				if (textReply === 'This username is already taken') {
					this.setState({ errorMessage: textReply });
				} else {
					this.setState({ username: '', email: '', password: '', errorMessage: '' });
				}
			});
	}

	render() {
		return (
			<div className="sign">
				<div className="user">
					<h1 className="hdr">Sign Up ^‿^</h1>
					<form className="form">
						<div className="form__group">
							<input
								type="text"
								placeholder="FullName"
								className="form__input"
								value={this.state.username}
								onChange={event => this.onChange(event)}
								name="username"
							/>
						</div>

						<div className="form__group">
							<input
								type="email"
								placeholder="Email"
								className="form__input"
								value={this.state.email}
								onChange={event => this.onChange(event)}
								name="email"
							/>
						</div>

						<div className="form__group">
							<input
								type="password"
								placeholder="Password"
								className="form__input"
								value={this.state.password}
								onChange={event => this.onChange(event)}
								name="password"
							/>
						</div>
						<NavLink to="/login">
							<button className="btn" type="button" onClick={() => this.postSignUp()}>
								Sign Up
							</button>
						</NavLink>
					</form>
				</div>
			</div>
		);
	}
}

export default SignUp;
