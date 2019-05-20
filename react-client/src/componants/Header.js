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

export default Header;