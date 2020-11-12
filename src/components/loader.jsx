import React, { Component } from 'react';
import logoT from '../img/logo/logoT.png'
import logoA from '../img/logo/logoA.png'
import logoF from '../img/logo/logoF.png'

class Loader extends Component {
    state = {  }
    render() { 
        return (
        <div className="loader">
            <div className="loader_img">
                <img src={logoT} className="logoT" alt=""></img>
                <img src={logoA} className="logoA" alt=""></img>
                <img src={logoF} className="logoF" alt=""></img>
            </div>
            {this.props.loadText ? <div className="loader_text"> {this.props.loadText} </div> : <></>}
        </div> 
        );
    }
}
 
export default Loader;