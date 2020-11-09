import React, { Component } from 'react';
import NavbarLink from './navbarlink';

class Navbar extends Component {
    state = {
        links: [
            {
                title: "Music",
                active: false
            },
            {
                title: "Home",
                active: false
            },
            {
                title: "Servers",
                active: false
            }
        ]
    }

    updateNavlinks = focTitle => {
        this.setState({
            links: this.state.links.map(
                ({ title, active }) => ({ title, active: title === focTitle })
            )
        });
    };

    render() { 
        return (
            <div id="Navbar">
                {this.state.links.map(link => <NavbarLink key={link.title} title={link.title} active={link.active} onClickFunc={this.updateNavlinks}/>) }
            </div>
        );
    }
}
 
export default Navbar;