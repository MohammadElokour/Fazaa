import React ,{Component} from "react"
import { NavLink } from "react-router-dom" 

class Driver extends Component{
    constructor(props){
        super(props)
        this.state={
            phoneNumber:'',
            carPlateNumber:'',
            carType:'',
            carColor:'',
            value:'No',
            Role:'driver'
        }
    }
    //
    onchange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    updatePay(){
      
      var username=localStorage.getItem('username');
      console.log(this.state.value,username)
      const body = {payment: this.state.value,username:username}
      fetch('http://127.0.0.1:9876/payment', {
      method: 'put',
      body: JSON.stringify(body),
      headers: {"Content-Type": "application/json"}
    }).then((response) => {
      return response.text();
    })
    }

    onclick(){
      var data =this.state
      var token = localStorage.getItem('token') 

      console.log(localStorage.getItem('token'))
      fetch('http://127.0.0.1:9876/driver', {
          method: 'put',
          body: JSON.stringify({data}),
          headers: {"Content-Type": "application/json",
      token: token }

        })
    }

    deleteR(){
      
      var username=localStorage.getItem('username');
      console.log('attempt to delete',username)
      const body = {username:username}
      fetch('http://127.0.0.1:9876/deleteRole', {
      method: 'put',
      body: JSON.stringify(body),
      headers: {"Content-Type": "application/json"}
    }).then((response) => {
      return response.text();
    })
    }

    handleChange(e) {
      this.setState({ value: e.target.value });
    }
    
    render(){
        return(
            
            <div>
                <br />
                <br />
                <input type="number" name="phoneNumber" value={this.state.phoneNumbers} placeholder="Phone Number" className="form__input" onChange={this.onchange.bind(this)} />
                <input type="text" name="carPlateNumber" value={this.state.carPlateNumbers} placeholder="Car Plate Number" className="form__input" onChange={this.onchange.bind(this)} />
                <input type="text" name="carType" value={this.state.carTypes} placeholder="Car Type" className="form__input" onChange={this.onchange.bind(this)} />
                <input type="text" name="carColor" value={this.state.carColors} placeholder="Car Color" className="form__input" onChange={this.onchange.bind(this)} />
                <label>
                Do you want passengers to pay:
                {/* <input type="text" name='payment' placeholder ="Yes/No" maxLength="3" value = {this.state.payment} onChange={this.onchange.bind(this)}/> */}
                <select onChange={this.handleChange.bind(this)}>
                  <option value='No'> No </option>
                  <option value='Yes' > Yes </option>
                  
                </select>
                </label>
                <button type='button' onClick={this.updatePay.bind(this)}>confirm</button>
                <br/>
                <label>
                  Do u wanna finish your the trip:
                <button type='button' onClick={this.deleteR.bind(this)}>cancel</button>
                </label>
                <button onClick={this.onclick.bind(this)} className="btn" type="button">Save</button>
            </div>
        )
    }
}
export default Driver;