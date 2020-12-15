import React, { Component } from 'react'
import { getUser, getPlaylist, changeVote } from '../scripts/API'
import Track from './track'
import Loader from './loader'

class userDisplay extends Component {
    state = {
        isLoading: true,
    }

    async componentDidMount(){
        let userID = this.props.match.params.userID
        let result = await getUser(userID)
        let displayName = ''

        if(result.nick === null){
            displayName = result.user.username
        }
        else{
            displayName = result.nick
        }

        let votes = 0;
        for (const index in result.tracks) {
            if (result.tracks.hasOwnProperty(index)) {
                const track = result.tracks[index];
                votes = votes + track.votes
            }
        }

        let aviURL = "https://cdn.discordapp.com/avatars/"+result.user.id+"/"+result.user.avatar+".png"

        const voteState = localStorage.getItem('trackVotes') ? (JSON.parse(localStorage.getItem('trackVotes'))) : [];

        this.setState({
            isLoading: false,
            userID,
            discriminator: result.user.discriminator,
            aviURL,
            displayName,
            items: result.tracks,
            votes,
            storedVotes: voteState
        })
    }

    updateVote = (trackID) => {
        let increment = false
        let voteClone = [...this.state.storedVotes]

        if(voteClone.includes(trackID)){
            let newArray = []
            const arrLength = voteClone.length
            for(var i = 0; i < arrLength; i++){
                if(voteClone[i] !== trackID){
                    newArray.push(voteClone[i])
                }
            }
            voteClone = newArray;
        }
        else{
            increment = true
            voteClone.push(trackID);
        }
        

        this.setState({
            storedVotes : voteClone
        })

        localStorage.setItem('trackVotes', JSON.stringify(voteClone))

        if(increment){
            changeVote(trackID, 'increment')
        }
        else{
            changeVote(trackID, 'decrement')
        }

    }

    render() {

        const avatarStyle = {
            backgroundImage: 'url('+this.state.aviURL+')',
        }

        return (
            <div>
                {this.state.isLoading ? <Loader loadText="This user has been busy, one moment."/> : 
                <div>
                    <div className="user_panel">
                        <div className="user_icon">
                            <div className="avatar" style={avatarStyle}></div>
                            <div className="name">
                                <span className="username">{this.state.displayName}</span>
                                <span className="discriminator">#{this.state.discriminator}</span>
                            </div>
                        </div>
                        <div className="stat">
                            <div className="title">Tracks</div>
                            <div className="data">{this.state.items.length}</div>
                        </div>
                        <div className="stat">
                            <div className="title">Votes</div>
                            <div className="data">{this.state.votes}</div>
                        </div>
                    </div>
                    {this.state.items.map(track => <Track key={track.id} trackObj={track} storageFunction={this.updateVote} voteStatus={this.state.storedVotes.includes(track.id)}/>) }
                </div>}
            </div>
        )
    }
}

export default userDisplay;