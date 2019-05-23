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
            Role:'driver'
        }
    }
    //
    onchange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
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


    
    render(){
        return(
            
            <div>
                <br />
                <br />
                <input type="number" name="phoneNumber" value={this.state.phoneNumbers} placeholder="Phone Number" className="form__input" onChange={this.onchange.bind(this)} />
                <input type="text" name="carPlateNumber" value={this.state.carPlateNumbers} placeholder="Car Plate Number" className="form__input" onChange={this.onchange.bind(this)} />
                <input type="text" name="carType" value={this.state.carTypes} placeholder="Car Type" className="form__input" onChange={this.onchange.bind(this)} />
                <input type="text" name="carColor" value={this.state.carColors} placeholder="Car Color" className="form__input" onChange={this.onchange.bind(this)} />

                <button onClick={this.onclick.bind(this)} className="btn" type="button">Save</button>
            </div>
        )
    }
}
export default Driver;