import React ,{Component} from "react"
import { NavLink } from "react-router-dom" 

class Passenger extends Component{
  constructor(props){
    super(props)
    this.state={
      Drivers:[]
    }
  }

  componentDidMount() {
      fetch('/driverss')
        .then(response => response.json())
        .then(data => {
          console.log(data)
          return this.setState({ Drivers:data.data})
        }
          );
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
                          <p className='dInfo'>Destination:{driver.destination}</p>
													<p className='dInfo'>PhoneNumber:{driver.phoneNumber}</p>
													<p className='dInfo'>CarType:{driver.carType}</p>
													<p className='dInfo'>CarPlateNumber:{driver.carPlateNumber}</p>
													<p className='dInfo'>CarColor :{driver.carColor}</p>
													<p className='dInfo'>CollectivePayment:{driver.payment}</p>
													<p className='dInfo'>OccupiedSeats:{driver.numberOfPassengers}</p>
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
    // ----------------------------------------------Old Render without style------------------------------------
    // return (
    //  
    //   <div className = 'drivers' >
    //     <h1 className='listname'>Drivers</h1><h6>(click on the name to see the driver's information)</h6>
    //     {
    //       this.state.Drivers.map((driver, i) => {
    //         return (
    //           <div className="driver" onClick={this.handleClick} key={i}>
    //           <h3>{driver.username}</h3>
    //           <button value={driver.username} onClick={() => this.pickUp(driver.username)}>Pick me up</button>
    //             <div className="opening">
    //             <h5>phone number:{driver.phoneNumber}</h5>
    //             <h5>car type:{driver.carType}</h5>
    //             <h5>care plate number:{driver.carPlateNumber}</h5>
    //             <h5>car color :{driver.carColor}</h5>
    //             <h5>collective payment:{driver.payment}</h5>
    //             <h5>occupied seats:{driver.numberOfPassengers}</h5>
    //             <h5>destination:{driver.destination}</h5>
    //             </div>
    //           </div>
    //         );
    //       })
    //     }
    //   </div>
     
    // );
  }
}
export default Passenger