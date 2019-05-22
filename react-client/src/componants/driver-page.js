import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Driver extends Component {
	constructor(props) {
		super(props);
		this.state = {
			phoneNumber: '',
			carPlateNumber: '',
			carType: '',
			carColor: '',
		};
	}
	//
	onchange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	onclick() {
		var data = this.state;
		$.ajax({
			type: 'POST',
			url: '/saveCar',
			data: { data },
			success: () => {
				console.log('saved');
			},
			dataType: 'json',
		});
	}

	render() {
		return (
			<div>
				<input
					type="number"
					name="phoneNumber"
					value={this.state.phoneNumbers}
					placeholder="Phone Number"
					className="form__input"
					onChange={this.onchange.bind(this)}
				/>
				<input
					type="text"
					name="carPlateNumber"
					value={this.state.carPlateNumbers}
					placeholder="Car Plate Number"
					className="form__input"
					onChange={this.onchange.bind(this)}
				/>
				<input
					type="text"
					name="carType"
					value={this.state.carTypes}
					placeholder="Car Type"
					className="form__input"
					onChange={this.onchange.bind(this)}
				/>
				<input
					type="text"
					name="carColor"
					value={this.state.carColors}
					placeholder="Car Color"
					className="form__input"
					onChange={this.onchange.bind(this)}
				/>

				<button className="btn" type="button">
					Save
				</button>
			</div>
		);
	}
}
export default Driver;
