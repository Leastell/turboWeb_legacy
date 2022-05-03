import React, { Component } from 'react';
import { getUserLeaderboard, getUserLeaderboardSeason } from '../scripts/API'
import Crown from '../img/misc/crown.svg'
import MiniLoader from './miniLoader';
import emptyAlbum from '../img/misc/emptyalbum.png'

class UserLeaderboard extends Component {

    state = { 
        isLoading: true,
        curSeason: 3
    }

    async componentDidMount(){
        const leadUsersAll = await getUserLeaderboard()
        const leadUsersSeason = await getUserLeaderboardSeason(this.state.curSeason)

        if (leadUsersSeason.length < 5){
            const fillerNeeded = 5-leadUsersSeason.length
            for (let i = 0; i < fillerNeeded; i++) {
                leadUsersSeason.push(['', undefined, '', ''])
            }
        }

        this.setState({
            leadUsersAll,
            leadUsersSeason
        })

        let userAvatars = {all:[], season:[]}
        let userIds = {all:[], season:[]}

        for (let i = 0; i < 5; i++) {

            // All
            userAvatars.all.push({backgroundImage: "url(https://cdn.discordapp.com/avatars/"+leadUsersAll[i][0]+"/"+leadUsersAll[i][3]+".png)", opacity: "0", cursor:"pointer"})

            userIds.all.push(leadUsersAll[i][0])

            // Season
            if(leadUsersSeason[i][0] === ''){
                userAvatars.season.push({backgroundImage: "url("+emptyAlbum+")", opacity: "100", cursor:"default"})
            } else {
                userAvatars.season.push({backgroundImage: "url(https://cdn.discordapp.com/avatars/"+leadUsersSeason[i][0]+"/"+leadUsersSeason[i][3]+".png)", opacity: "100", cursor:"pointer"})

                userIds.season.push(leadUsersSeason[i][0])
            }
            
        }

        this.generateLeaderboard(this.state.curSeason)

        let labelText = "Season "+this.state.curSeason
        let curMode = this.state.curSeason

        this.setState({
            isLoading: false,
            userAvatars,
            userIds,
            labelText,
            curMode
        })
    }
 
    generateLeaderboard = (season) => {
        let leaderboardUsers = []

        if(season === 0){
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
                minHeight: "120px"
            }
            if(userVal === undefined || userVal === 0){
                style.height = "1%"
            } else {
                style.height = parseInt(Math.floor(calcHeight)) + "%"
            }

            heightCalculations.push(style)
        }

        this.setState({
            leaderboardUsers,
            heightCalculations
        })
    }

    userRoute = (place) => {
        let userId = undefined

        if (this.state.curMode > 0){
            userId = this.state.userIds.season[place]
        } else{
            userId = this.state.userIds.all[place]
        }

        if(userId !== undefined){
            this.props.history.push("/music/user/"+userId)
        }
    }

    render() {

        let switchClick = () => {
            let element = document.getElementsByClassName("slider")[0];
            let avatarTemp = JSON.parse(JSON.stringify(this.state.userAvatars));

            if(element.classList.contains('active')){

                element.classList.remove('active');

                for (let i = 0; i < avatarTemp.season.length; i++) {
                    if(avatarTemp.season[i].backgroundImage !== avatarTemp.all[i].backgroundImage){
                        avatarTemp.season[i].opacity = "0"
                        avatarTemp.all[i].opacity = "100"
                    }
                }

                this.setState({
                    labelText: "All-Time",
                    userAvatars: avatarTemp
                })
                this.generateLeaderboard(0)

                this.setState({
                    curMode: 0
                })
            }
            else{
                element.classList.add('active');

                for (let i = 0; i < avatarTemp.season.length; i++) {
                    if(avatarTemp.season[i].backgroundImage !== avatarTemp.all[i].backgroundImage){
                        avatarTemp.season[i].opacity = "100"
                        avatarTemp.all[i].opacity = "0"
                    }
                }

                this.setState({
                    labelText: "Season "+this.state.curSeason,
                    userAvatars: avatarTemp
                })
                this.generateLeaderboard(2)

                let curMode = this.state.curSeason
                this.setState({
                    curMode
                })
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
                            <div className="avatar" onClick={() => this.userRoute(0)}>
                                <div className="avi all" style={this.state.userAvatars.all[0]} ></div>
                                <div className="avi season" style={this.state.userAvatars.season[0]} ></div>
                                <img src={Crown} alt="crown" className="crown"/>
                            </div>
                            <div className="name">{this.state.leaderboardUsers[0][2]}</div>
                            <div className="votes">{this.state.leaderboardUsers[0][1]}</div>
                        </div>
                        <div className="leaderboardUser second" style={this.state.heightCalculations[1]} key="second">
                            <div className="avatar" onClick={() => this.userRoute(1)}>
                                <div className="avi all" style={this.state.userAvatars.all[1]} ></div>
                                <div className="avi season" style={this.state.userAvatars.season[1]} ></div>
                            </div>
                            <div className="name">{this.state.leaderboardUsers[1][2]}</div>
                            <div className="votes">{this.state.leaderboardUsers[1][1]}</div>
                        </div>
                        <div className="leaderboardUser third" style={this.state.heightCalculations[2]} key="third">
                            <div className="avatar" onClick={() => this.userRoute(2)}>
                                <div className="avi all" style={this.state.userAvatars.all[2]} ></div>
                                <div className="avi season" style={this.state.userAvatars.season[2]} ></div>
                            </div>
                            <div className="name">{this.state.leaderboardUsers[2][2]}</div>
                            <div className="votes">{this.state.leaderboardUsers[2][1]}</div>
                        </div>
                        <div className="leaderboardUser fourth" style={this.state.heightCalculations[3]} key="fourth">
                            <div className="avatar" onClick={() => this.userRoute(3)}>
                                <div className="avi all" style={this.state.userAvatars.all[3]} ></div>
                                <div className="avi season" style={this.state.userAvatars.season[3]}></div>
                            </div>
                            <div className="name">{this.state.leaderboardUsers[3][2]}</div>
                            <div className="votes">{this.state.leaderboardUsers[3][1]}</div>
                        </div>
                        <div className="leaderboardUser fifth" style={this.state.heightCalculations[4]} key="fifth">
                            <div className="avatar" onClick={() => this.userRoute(5)}>
                                <div className="avi all" style={this.state.userAvatars.all[4]} ></div>
                                <div className="avi season" style={this.state.userAvatars.season[4]} ></div>
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