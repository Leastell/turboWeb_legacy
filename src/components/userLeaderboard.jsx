import React, { Component } from 'react';
import { getUserLeaderboard, getUserLeaderboardSeason } from '../scripts/API'
import Crown from '../img/misc/crown.svg'
import MiniLoader from './miniLoader';

class UserLeaderboard extends Component {

    state = { 
        isLoading: true,
    }

    async componentDidMount(){
        const leadUsersAll = await getUserLeaderboard()
        const leadUsersSeason = await getUserLeaderboardSeason(2)

        this.setState({
            leadUsersAll,
            leadUsersSeason
        })

        this.generateLeaderboard(2)

        this.setState({
            isLoading: false,
            labelText: "Season"
        })
    }

    generateLeaderboard = (season) => {
        let leaderboardUsers = []

        if(season == 0){
            leaderboardUsers = [...this.state.leadUsersAll]
        }
        else{
            leaderboardUsers = [...this.state.leadUsersSeason]
        }

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

        this.setState({
            userAvatars,
            leaderboardUsers,
            heightCalculations
        })
    }

    render() {

        let switchClick = () => {
            let element = document.getElementsByClassName("slider")[0]
            if(element.classList.contains('active')){
                element.classList.remove('active');
                this.setState({
                    labelText: "All-Time"
                })
                this.generateLeaderboard(0)
            }
            else{
                element.classList.add('active');
                this.setState({
                    labelText: "Season"
                })
                this.generateLeaderboard(2)
            } 
        }

        return (
            <>
                <div className="leaderboardFrame">
                {this.state.isLoading ? <MiniLoader /> :
                <>
                    <div className="leaderboardTop">
                        <div className="label">{this.state.labelText}</div>
                        <div className="switch">
                            <input type="checkbox" checked onClick={switchClick}/>
                            <div className="slider active"></div>
                        </div>
                    </div>
                    <div className="userLeaderboard">
                        <div className="leaderboardUser first" style={this.state.heightCalculations[0]} key="first">
                            <div className="avatar" style={this.state.userAvatars[0]}><img src={Crown} alt="crown" className="crown"/></div>
                            <div className="name">{this.state.leaderboardUsers[0][2]}</div>
                            <div className="votes">{this.state.leaderboardUsers[0][1]}</div>
                        </div>
                        <div className="leaderboardUser second" style={this.state.heightCalculations[1]} key="second">
                            <div className="avatar" style={this.state.userAvatars[1]}></div>
                            <div className="name">{this.state.leaderboardUsers[1][2]}</div>
                            <div className="votes">{this.state.leaderboardUsers[1][1]}</div>
                        </div>
                        <div className="leaderboardUser third" style={this.state.heightCalculations[2]} key="third">
                            <div className="avatar" style={this.state.userAvatars[2]}></div>
                            <div className="name">{this.state.leaderboardUsers[2][2]}</div>
                            <div className="votes">{this.state.leaderboardUsers[2][1]}</div>
                        </div>
                        <div className="leaderboardUser fourth" style={this.state.heightCalculations[3]} key="fourth">
                            <div className="avatar" style={this.state.userAvatars[3]}></div>
                            <div className="name">{this.state.leaderboardUsers[3][2]}</div>
                            <div className="votes">{this.state.leaderboardUsers[3][1]}</div>
                        </div>
                        <div className="leaderboardUser fifth" style={this.state.heightCalculations[4]} key="fifth">
                            <div className="avatar" style={this.state.userAvatars[4]}></div>
                            <div className="name">{this.state.leaderboardUsers[4][2]}</div>
                            <div className="votes">{this.state.leaderboardUsers[4][1]}</div>
                        </div>
                    </div>
                </>}
                </div>
            </>
        );
    }
}
 
export default UserLeaderboard;