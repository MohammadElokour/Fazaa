import React ,{Component} from "react"
import { NavLink } from "react-router-dom" 
import Header from './signoutHeader';


class Passenger extends Component{
  constructor(props){
    super(props)
    this.state={
      Drivers:[]
    }
  }

  componentDidMount() {
    setInterval(()=>{
      fetch('/driverss')
        .then(response => response.json())
        .then(data => {
          // console.log("data")
           this.setState({ Drivers:data.data})
        }
          );

    },1000)
    }
    
    handleClick(event){
      event.currentTarget.classList.toggle('active');
    }

  	pickUp(name) {
      
      var username=localStorage.getItem('username');
      var body = {'username':username,'driverName':name}
      console.log(name,username)
      fetch('/pickup', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {"Content-Type": "application/json"}
      }).then((response) => {
        this.componentDidMount()
        return response.text();
      })
    }
  render(){
    return (
			<div>
				<div className="row">
					<div className="col-md-6">
						<div id="allbox" className="drivers">
							<h2 id="Ph2">Drivers in Your Area</h2>
							<div id="dbox">
									{this.state.Drivers.map((driver, i) => {
										return (
											<div id="dlist" className="driver" onClick={this.handleClick} key={i}>
												<p className='dnames'>{driver.username}</p>
												<button id='pickbtn'
													value={driver.username}
													onClick={() => this.pickUp(driver.username)}
												>
													Pick me up
												</button>
												<div className="opening">
                          <p className='dInfo'>Destination: {driver.destination}</p>
													<p className='dInfo'>PhoneNumber: {driver.phoneNumber}</p>
													<p className='dInfo'>Car Type: {driver.carType}</p>
													<p className='dInfo'>Car Color: {driver.carColor}</p>
                          <p className='dInfo'>License Plate: {driver.carPlateNumber}</p>
													<p className='dInfo'>Collective Payment: {driver.payment}</p>
													<p className='dInfo'>Occupied Seats [Max=4]: {driver.numberOfPassengers}</p>
												</div>
											</div>
										);
									})}
							</div>
						</div>
					</div>
					<div className="col-md-6">{/* map goes here */}</div>
				</div>
			</div>
		);

  }
}
export default Passenger;