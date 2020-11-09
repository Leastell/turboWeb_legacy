import React, { Component } from 'react';
import Neon from '../img/logo/neon.png'


class ConstructionPage extends Component {
    state = {  }
    render() { 
        return (
            <div id="construction">
                <img src={Neon} alt="logo" />
                <div className="title">Under Construction</div>
                <div>It'll be sick.</div>
            </div>
         );
    }
}
 
export default ConstructionPage;