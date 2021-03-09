import React, { Component } from 'react';
import miniLoaderImg from '../img/misc/miniloader.png'

class MiniLoader extends Component {
    state = {  }
    render() { 
        return (
        <div className="mini_loader">
            <img src={miniLoaderImg} alt="miniloader"></img>
            {this.props.loadText ? <div className="loader_text"> {this.props.loadText} </div> : <></>}
        </div> 
        );
    }
}
 
export default MiniLoader;