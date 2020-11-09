import React, { Component } from 'react';
import Logo from '../img/logo/transparent-logo.png'


class badRoute extends Component {
    state = {  }
    render() { 
        return (
            <div id="notFound">
                <img src={Logo} alt="logo" />
                <div className="title">404 - Not Found</div>
                <div>You seem lost.</div>
            </div>
         );
    }
}
 
export default badRoute;