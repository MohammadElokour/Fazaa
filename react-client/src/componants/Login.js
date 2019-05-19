import React from 'react';

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
