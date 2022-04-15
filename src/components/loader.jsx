import React, { Component } from 'react';
import miniLoaderImg from '../img/misc/loader.png'

class Loader extends Component {
    state = {  }
    render() { 
        return (
        <div className="loader">
            <img src={miniLoaderImg} alt="loader"></img>
            {this.props.loadText ? <div className="loader_text"> {this.props.loadText} </div> : <></>}
        </div> 
        );
    }
}
 
export default Loader;