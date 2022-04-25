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

        const userAvatars = {
            all: [
                {backgroundImage: "url(https://cdn.discordapp.com/avatars/"+leadUsersAll[0][0]+"/"+leadUsersAll[0][3]+".png)", opacity: "0"},
                {backgroundImage: "url(https://cdn.discordapp.com/avatars/"+leadUsersAll[1][0]+"/"+leadUsersAll[1][3]+".png)", opacity: "0"},
                {backgroundImage: "url(https://cdn.discordapp.com/avatars/"+leadUsersAll[2][0]+"/"+leadUsersAll[2][3]+".png)", opacity: "0"},
                {backgroundImage: "url(https://cdn.discordapp.com/avatars/"+leadUsersAll[3][0]+"/"+leadUsersAll[3][3]+".png)", opacity: "0"},
                {backgroundImage: "url(https://cdn.discordapp.com/avatars/"+leadUsersAll[4][0]+"/"+leadUsersAll[4][3]+".png)", opacity: "0"}
            ],
            season: [
                {backgroundImage: "url(https://cdn.discordapp.com/avatars/"+leadUsersSeason[0][0]+"/"+leadUsersSeason[0][3]+".png)", opacity: "100"},
                {backgroundImage: "url(https://cdn.discordapp.com/avatars/"+leadUsersSeason[1][0]+"/"+leadUsersSeason[1][3]+".png)", opacity: "100"},
                {backgroundImage: "url(https://cdn.discordapp.com/avatars/"+leadUsersSeason[2][0]+"/"+leadUsersSeason[2][3]+".png)", opacity: "100"},
                {backgroundImage: "url(https://cdn.discordapp.com/avatars/"+leadUsersSeason[3][0]+"/"+leadUsersSeason[3][3]+".png)", opacity: "100"},
                {backgroundImage: "url(https://cdn.discordapp.com/avatars/"+leadUsersSeason[4][0]+"/"+leadUsersSeason[4][3]+".png)", opacity: "100"}
            ]
        }

        this.generateLeaderboard(2)

        console.log("Not loading anymore");
        this.setState({
            isLoading: false,
            userAvatars,
            labelText: "Season"
        })

        console.log(this.state.userAvatars.all[1])
    }
 
    generateLeaderboard = (season) => {
        let leaderboardUsers = []

        if(season == 0){
            leaderboardUsers = [...this.state.leadUsersAll]
        }
        else{
            leaderboardUsers = [...this.state.leadUsersSeason]
        }

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
            leaderboardUsers,
            heightCalculations
        })
    }

    render() {

        let switchClick = () => {
            let element = document.getElementsByClassName("slider")[0];
            let avatarTemp = JSON.parse(JSON.stringify(this.state.userAvatars));

            if(element.classList.contains('active')){
                element.classList.remove('active');

                for (let i = 0; i < avatarTemp.season.length; i++) {
                    avatarTemp.season[i].opacity = "0"
                    avatarTemp.all[i].opacity = "100"
                }

                this.setState({
                    labelText: "All-Time",
                    userAvatars: avatarTemp
                })
                this.generateLeaderboard(0)
            }
            else{
                element.classList.add('active');

                for (let i = 0; i < avatarTemp.season.length; i++) {
                    avatarTemp.season[i].opacity = "100"
                    avatarTemp.all[i].opacity = "0"
                }

                this.setState({
                    labelText: "Season",
                    userAvatars: avatarTemp
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
                            <input type="checkbox" onClick={switchClick}/>
                            <div className="slider active"></div>
                        </div>
                    </div>
                    <div className="userLeaderboard">
                        <div className="leaderboardUser first" style={this.state.heightCalculations[0]} key="first">
                            <div className="avatar">
                                <div className="avi all" style={this.state.userAvatars.all[0]}></div>
                                <div className="avi season" style={this.state.userAvatars.season[0]}></div>
                                <img src={Crown} alt="crown" className="crown"/>
                            </div>
                            <div className="name">{this.state.leaderboardUsers[0][2]}</div>
                            <div className="votes">{this.state.leaderboardUsers[0][1]}</div>
                        </div>
                        <div className="leaderboardUser second" style={this.state.heightCalculations[1]} key="second">
                            <div className="avatar">
                                <div className="avi all" style={this.state.userAvatars.all[1]}></div>
                                <div className="avi season" style={this.state.userAvatars.season[1]}></div>
                            </div>
                            <div className="name">{this.state.leaderboardUsers[1][2]}</div>
                            <div className="votes">{this.state.leaderboardUsers[1][1]}</div>
                        </div>
                        <div className="leaderboardUser third" style={this.state.heightCalculations[2]} key="third">
                            <div className="avatar">
                                <div className="avi all" style={this.state.userAvatars.all[2]}></div>
                                <div className="avi season" style={this.state.userAvatars.season[2]}></div>
                            </div>
                            <div className="name">{this.state.leaderboardUsers[2][2]}</div>
                            <div className="votes">{this.state.leaderboardUsers[2][1]}</div>
                        </div>
                        <div className="leaderboardUser fourth" style={this.state.heightCalculations[3]} key="fourth">
                            <div className="avatar">
                                <div className="avi all" style={this.state.userAvatars.all[3]}></div>
                                <div className="avi season" style={this.state.userAvatars.season[3]}></div>
                            </div>
                            <div className="name">{this.state.leaderboardUsers[3][2]}</div>
                            <div className="votes">{this.state.leaderboardUsers[3][1]}</div>
                        </div>
                        <div className="leaderboardUser fifth" style={this.state.heightCalculations[4]} key="fifth">
                            <div className="avatar">
                                <div className="avi all" style={this.state.userAvatars.all[4]}></div>
                                <div className="avi season" style={this.state.userAvatars.season[4]}></div>
                            </div>
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