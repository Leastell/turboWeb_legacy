import React, { Component } from 'react';

class DiscordUser extends Component {
    state = {  }
    render() { 

        const userObj = this.props.userObj
        const aviURL = "https://cdn.discordapp.com/avatars/"+userObj.user.id+"/"+userObj.user.avatar+".png"

        const avatarStyle = {
            backgroundImage: 'url('+aviURL+')',
        }
        
        return (
            <div className="discord_user">
                <div className="avatar" style={avatarStyle}/>
                <div className="name">{userObj.nick ? userObj.nick : userObj.user.username}</div>
            </div>
        );
    }
}
 
export default DiscordUser;