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
            payment:'No'
        }
    }
    //
    onchange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onclick(){
      var data = this.state
      $.ajax({
        type: "POST",
        url: "/saveCar",
        data: {data},
        success: ()=>{
            console.log("saved")
        },
        dataType: 'json'
      });
    };
    payment(e){
      this.setState({
        payment:e.target.value
      })
    };
    updatePay(){
      
      var username=localStorage.getItem('username');
      console.log(this.state.payment,username)
      const body = {payment: this.state.payment,username:username}
      fetch('http://127.0.0.1:9876/payment', {
      method: 'put',
      body: JSON.stringify(body),
      headers: {"Content-Type": "application/json"}
    }).then((response) => {
      return response.text();
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
    
    render(){
        return(
            <div>
                <input type="number" name="phoneNumber" value={this.state.phoneNumbers} placeholder="Phone Number" className="form__input" onChange={this.onchange.bind(this)} />
                <input type="text" name="carPlateNumber" value={this.state.carPlateNumbers} placeholder="Car Plate Number" className="form__input" onChange={this.onchange.bind(this)} />
                <input type="text" name="carType" value={this.state.carTypes} placeholder="Car Type" className="form__input" onChange={this.onchange.bind(this)} />
                <input type="text" name="carColor" value={this.state.carColors} placeholder="Car Color" className="form__input" onChange={this.onchange.bind(this)} />

                <button className="btn" type="button">Save</button>
                <label>
                Do you want passengers to pay (yes/no):
                <input type="text" placeholder ="Yes/No" value = {this.state.payment} onChange={this.payment.bind(this)}/>
                </label>
                <button type='button' onClick={this.updatePay.bind(this)}>confirm</button>
                <button type='button' onclick={this.deleteR.bind(this)}>cancel</button>
            </div>
        )
    }
}
export default Driver;