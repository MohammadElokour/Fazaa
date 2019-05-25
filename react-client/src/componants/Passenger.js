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
    
      <div className = 'drivers' >
        <h1 className='listname'>Drivers </h1><h6>(click on the name to see the driver's information)</h6>
        {
          this.state.Drivers.map((driver, i) => {
            return (
              <div className="driver" onClick={this.handleClick} key={i}>
              <h3>{driver.username}</h3>
              <button value={driver.username} onClick={() => this.pickUp(driver.username)}>Pick me up</button>
                <div className="opening">
                <h5>phone number:{driver.phoneNumber}</h5>
                <h5>car type:{driver.carType}</h5>
                <h5>care plate number:{driver.carPlateNumber}</h5>
                <h5>car color :{driver.carColor}</h5>
                <h5>collective payment:{driver.payment}</h5>
                <h5>occupied seats:{driver.numberOfPassengers}</h5>
                <h5>destination:{driver.destination}</h5>
                </div>
              </div>
            );
          })
        }
      </div>
     
    );
}
}
export default Passenger