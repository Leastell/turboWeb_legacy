import React, { Component } from 'react';
import logoT from '../img/logo/logoT.png'
import logoA from '../img/logo/logoA.png'
import logoF from '../img/logo/logoF.png'
import banner from '../img/logo/banner.png'


class HomePage extends Component {
    state = { isVisible: true }

    piecedLogo = <div>
        <img src={logoT} className="logoT" alt=""></img>
        <img src={logoA} className="logoA" alt=""></img>
        <img src={logoF} className="logoF" alt=""></img>
    </div>
           
    componentDidMount() {
        
    }

    render() {
        return ( 
            <div className="banner">
                <img src={banner} alt=''/>
            </div>
        );
    }
}
 
export default HomePage;