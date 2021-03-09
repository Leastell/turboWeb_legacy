import React, { Component } from 'react';
import { getUserLeaderboard } from '../scripts/API'
import Crown from '../img/misc/crown.svg'
import MiniLoader from './miniLoader';

class UserLeaderboard extends Component {
    state = {  }

    state = { 
        isLoading: true,
    }

    async componentDidMount(){
        const leaderboardUsers = await getUserLeaderboard()
 
        const userAvatars = [
            {backgroundImage: "url(https://cdn.discordapp.com/avatars/"+leaderboardUsers[0][0]+"/"+leaderboardUsers[0][3]+".png)"},
            {backgroundImage: "url(https://cdn.discordapp.com/avatars/"+leaderboardUsers[1][0]+"/"+leaderboardUsers[1][3]+".png)"},
            {backgroundImage: "url(https://cdn.discordapp.com/avatars/"+leaderboardUsers[2][0]+"/"+leaderboardUsers[2][3]+".png)"},
            {backgroundImage: "url(https://cdn.discordapp.com/avatars/"+leaderboardUsers[3][0]+"/"+leaderboardUsers[3][3]+".png)"},
            {backgroundImage: "url(https://cdn.discordapp.com/avatars/"+leaderboardUsers[4][0]+"/"+leaderboardUsers[4][3]+".png)"}
        ]

        let maxVal = leaderboardUsers[0][1]
        let heightCalculations = []

        for (const index in leaderboardUsers) {
            let userVal = leaderboardUsers[index][1];
            let calcHeight = (userVal / maxVal) * 100;
            let style = {
                height: parseInt(Math.floor(calcHeight)) + "%",
                minHeight: "120px"
            }
            heightCalculations.push(style)
        }
        
        console.log(heightCalculations);

        let leaderboardElements = [
            <div className="leaderboardUser first" style={heightCalculations[0]} key="first">
                <div className="avatar" style={userAvatars[0]}><img src={Crown} alt="crown" className="crown"/></div>
                <div className="name">{leaderboardUsers[0][2]}</div>
                <div className="votes">{leaderboardUsers[0][1]}</div>
            </div>,
            <div className="leaderboardUser second" style={heightCalculations[1]} key="second">
                <div className="avatar" style={userAvatars[1]}></div>
                <div className="name">{leaderboardUsers[1][2]}</div>
                <div className="votes">{leaderboardUsers[1][1]}</div>
            </div>,
            <div className="leaderboardUser third" style={heightCalculations[2]} key="third">
                <div className="avatar" style={userAvatars[2]}></div>
                <div className="name">{leaderboardUsers[2][2]}</div>
                <div className="votes">{leaderboardUsers[2][1]}</div>
            </div>,
            <div className="leaderboardUser fourth" style={heightCalculations[3]} key="fourth">
                <div className="avatar" style={userAvatars[3]}></div>
                <div className="name">{leaderboardUsers[3][2]}</div>
                <div className="votes">{leaderboardUsers[3][1]}</div>
            </div>,
            <div className="leaderboardUser fifth" style={heightCalculations[4]} key="fifth">
                <div className="avatar" style={userAvatars[4]}></div>
                <div className="name">{leaderboardUsers[4][2]}</div>
                <div className="votes">{leaderboardUsers[4][1]}</div>
            </div>
        ]
        this.setState({
            isLoading: false,
            leaderboardElements
        })
    }

    render() { 
        return (
            <>
                <div className="leaderboardFrame">
                {this.state.isLoading ? <MiniLoader /> :
                <> 
                        <div className="userLeaderboard">
                            {this.state.leaderboardElements.map(leaderboardElement => leaderboardElement) }
                        </div>
                </>}
                </div>
            </>
        );
    }
}
 
export default UserLeaderboard;