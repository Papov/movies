import React, { Component } from "react";
import Login from "./Login/Login";


export default class Header extends Component{
  render() {
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className='container'>
          <a className='nav-item text-white font-weight-bold'>Home</a>
          <Login/>
        </div>
      </nav>
    );
  }

}