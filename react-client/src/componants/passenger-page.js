import React, { Component } from 'react';

class Passenger extends Component {
	constructor(props) {
		super(props);
		this.state = {
      Drivers: [],
		  errorMessage: ''
		};
	}
  
  
  componentDidMount() {
    const token = localStorage.getItem('token');
    console.log(token)
    fetch('/driverlist', {
      method: 'get',
      headers: {"Content-Type": "application/json",
      token: token }
    }).then((response) => {
      return response.json();
    }).then((body) => {
      console.log(body);
      if(body.error){
        return this.setState({errorMessage: body.error})
      };
      return this.setState({places: body.places, whatPageToShow: 'places'})
    })
  }


	onchange(e) {
		this.setState({});
	}

	onclick() {
		var data = this.state;
		var token = localStorage.getItem('token');
		fetch('/passenger', {});
	}

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-md-6">
						<div id="allbox">
							<h2 id="Ph2">Drivers in Your Area</h2>
							<div id="dbox">
								<ul type='circle' id="dlist">
									<li className="dEntry">Joey</li>
									<li className="dEntry">Sam</li>
                  <li className="dEntry">Yousef</li>
									<li className="dEntry">Alan</li>
                  <li className="dEntry">Iman</li>
                  <li className="dEntry">Gary</li>
                  <li className="dEntry">Victoria</li>
                  <li className="dEntry">Hailey</li>
								</ul>
							</div>
						</div>
					</div>
          <div className="col-md-6">
          {/* map goes here */}
          </div>
				</div>
			</div>
		);
	}
}

export default Passenger;
