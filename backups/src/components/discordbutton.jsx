import React, { Component } from 'react';
import DiscordLogo from '../img/discord/Discord-Alien-White.png'

class DiscordButton extends Component {
    state = {  }
    render() { 
        return ( <div className="discordButton">
            <a href="https://discord.gg/eGaVZKg" target="none"><img src={DiscordLogo} alt="Discord logo"></img></a>
        </div> );
    }
}
 
export default DiscordButton;