import React ,{Component} from "react"
import { NavLink } from "react-router-dom" 
import {link, Switch, Route, BrowserRouter} from 'react-router-dom';
class Header extends Component {
  render(){
    return(
    <div>
      <ul id="ulnav">
          <li className="linav">
            {/* <link to='/'>Home</link> */}
           {/* <a className="active" href="/">Home</a> */}
           <NavLink to="/" >Home</NavLink>
          </li>
          <li className="linav">
            {/* <link to='/SignUp'>SignUp</link> */}
            {/* <a href="/SignUp">SignUp</a> */}
            <NavLink to="/signup" >SignUp</NavLink>
          </li>
        <li className="linav">
        {/* <link to='/Login'>Login </link> */}
        {/* <a href="/Login">Login</a> */}
        <NavLink to="/login" >Login</NavLink>
        </li>
        
    </ul>
  </div>
    )
  }
}

export default Header;