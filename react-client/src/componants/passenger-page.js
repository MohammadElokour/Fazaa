import React, { Component } from 'react';

class Passenger extends Component {
	constructor(props) {
		super(props);
		this.state = {
      drivers: [],
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
      return this.setState({drivers: body.drivers})
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
								<div type='circle' id="dlist">
									<div className="dEntry">Joey</div>
									<div className="dEntry">Sam</div>
                  <div className="dEntry">Yousef</div>
									<div className="dEntry">Alan</div>
                  <div className="dEntry">Iman</div>
                  <div className="dEntry">Gary</div>
                  <div className="dEntry">Victoria</div>
                  <div className="dEntry">Hailey</div>
								</div>
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
