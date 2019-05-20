<<<<<<< HEAD
import React ,{Component} from "react"
import { NavLink } from "react-router-dom" 
// import {link, Switch, Route, BrowserRouter} from 'react-router-dom';
class Header extends Component {
  render(){
    return(
    <div>
      <ul>
          <li>
            {/* <link to='/'>Home</link> */}
           {/* <a className="active" href="/">Home</a> */}
           <NavLink to="/" >Home</NavLink>
          </li>
          <li>
            {/* <link to='/SignUp'>SignUp</link> */}
            {/* <a href="/SignUp">SignUp</a> */}
            <NavLink to="/signup" >SignUp</NavLink>
          </li>
        <li>
        {/* <link to='/Login'>Login </link> */}
        {/* <a href="/Login">Login</a> */}
        <NavLink to="/login" >Login</NavLink>
        </li>
    </ul>
  </div>
    )
  }
}

=======
import React ,{Component} from "react"
// import {Link} from 'react-router';
class Header extends Component {
  constructor(){
    super()
  }
  render(){
    return(
    <div>
      <ul>
          <li>
            {/* <Link to={"/"}>Home</Link> */}
           <a className="active" href="/">Home</a>
          </li>
          <li>
            {/* <Link to={"/SignUp"}>SignUp</Link> */}
            <a href="/SignUp">SignUp</a>
          </li>
        <li>
        {/* <Link to={"/Login"}>Login </Link> */}
        <a href="/Login">Login</a>
        </li>
    </ul>
  </div>
    )
  }
}

>>>>>>> 133302b05379e20356abf6fe5caf32e0c88a0d5f
export default Header;