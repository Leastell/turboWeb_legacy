import React, { Component } from 'react'
import { getPlaylist, changeVote } from '../scripts/API'
import Track from './track'
import Loader from './loader'

class datePlaylist extends Component {
    state = { 
        isLoading: true,
        playlistDate : '',
        items: [],
        previous: '',
        storedVotes: []
    }
    
    async componentDidMount(){

        let playlistDate= this.props.match.params.playlistDate

        let playlistItems = await getPlaylist(playlistDate)

        const voteState = localStorage.getItem('trackVotes') ? (JSON.parse(localStorage.getItem('trackVotes'))) : [];

        this.setState({
            isLoading: false,
            playlistDate,
            items: playlistItems,
            storedVotes : voteState
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
        let startDate = new Date(this.props.match.params.playlistDate);
        startDate = startDate.add(1).day()
        let endDate = new Date(startDate)
        endDate = endDate.add(6).day()

        return (
            <div className="playlist">
                <div className="heading">{startDate.toString("MMM dd")} - {endDate.toString("MMM dd")}</div>
                {this.state.isLoading ? <Loader /> : 
                <div>
                    {this.state.items.map(track => <Track key={track.id} trackObj={track} storageFunction={this.updateVote} voteStatus={this.state.storedVotes.includes(track.id)} />) }
                </div>}
            </div>);
        }
}
 
export default datePlaylist;