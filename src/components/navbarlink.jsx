import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'

class NavbarLink extends Component {
    render() {
        let linkTarget = '/'+this.props.title
        return (
             <NavLink activeClassName="active" to={linkTarget} className={"navbar_link"} onClick={() => this.props.onClickFunc(this.props.title)}>
                {this.props.title}
            </NavLink>
        );
    }
}
 
export default NavbarLink;