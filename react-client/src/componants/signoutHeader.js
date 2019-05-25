import React ,{Component} from "react"
import { NavLink } from "react-router-dom" 

// import {link, Switch, Route, BrowserRouter} from 'react-router-dom';
class Header extends Component {
 
    SignOut(){
        var driver=localStorage.getItem('username'); 
        console.log(driver);
        var body1 = {"driver": driver} 
        fetch('http://127.0.0.1:9876/delete-trip', {
          method: 'put',
          body: JSON.stringify(body1),
          headers: {"Content-Type": "application/json"}
        })


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
      
      localStorage.clear();
  }
 
    render(){
    return(
    <div>
      <ul id='ulnav'>
          <li className='linav'>
            {/* <link to='/'>Home</link> */}
           {/* <a className="active" href="/">Home</a> */}
           <NavLink to="/" >Home</NavLink>
          </li>
          <li className='linav'>
            {/* <link to='/SignUp'>SignUp</link> */}
            {/* <a href="/SignUp">SignUp</a> */}
            <NavLink to="/homepage" onClick={this.SignOut.bind(this)} >Sign Out</NavLink>
          </li>
      
    </ul>
  </div>
    )
  }
}

export default Header;