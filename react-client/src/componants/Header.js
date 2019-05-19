import React ,{Component} from "react"
// import {link, Switch, Route, BrowserRouter} from 'react-router-dom';
class Header extends Component {
  render(){
    return(
    <div>
      <ul>
          <li>
            {/* <link to='/'>Home</link> */}
           <a className="active" href="/">Home</a>
          </li>
          <li>
            {/* <link to='/SignUp'>SignUp</link> */}
            <a href="/SignUp">SignUp</a>
          </li>
        <li>
        {/* <link to='/Login'>Login </link> */}
        <a href="/Login">Login</a>
        </li>
    </ul>
  </div>
    )
  }
}

export default Header;