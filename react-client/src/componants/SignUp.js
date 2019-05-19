import React ,{Component} from 'react';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="sign">
				<div className="user">
					<h1 className="hdr">Sign Up ^_^</h1>
					<form className="form">
						<div className="form__group">
							<input type="text" placeholder="Username" className="form__input" />
						</div>

						<div className="form__group">
							<input type="email" placeholder="Email" className="form__input" />
						</div>

						<div className="form__group">
							<input type="password" placeholder="Password" className="form__input" />
						</div>

						<button className="btn" type="button">
							Sign Up
						</button>
					</form>
				</div>
			</div>
		);
	}
}

export default SignUp;
