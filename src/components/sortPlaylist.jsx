import React, { Component } from 'react';
import { getPlaylist, changeVote } from '../scripts/API'
import Track from './track'
import Loader from './loader'

class SortPlaylist extends Component {
    state = {
        renderTracks: [],
        isLoading: true
    }

    // The playlist will be given the origin, originVal, and sortBy props. for instance:
    // origin = "user", originVal = "userID", sortBy="votes"
    // origin = "date", originVal = "playlistDate", sortBy="linear"

    async componentDidMount(){
        let pendTracks = {}
        const voteState = localStorage.getItem('trackVotes') ? (JSON.parse(localStorage.getItem('trackVotes'))) : [];

        if(this.props.origin === "date"){
            const playlistDate = this.props.originVal

            let playlistItems = await getPlaylist(playlistDate)
            
            pendTracks = playlistItems   
        }

        if(this.props.sortBy === "reverse"){
            
        }


        this.setState({
            renderTracks: pendTracks,
            storedVotes : voteState
        })

        this.props.loadFunc()
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
        return (
            <>
            { this.state.renderTracks.map(track => <Track key={track.id} trackObj={track} storageFunction={this.updateVote} voteStatus={this.state.storedVotes.includes(track.id)} />) }
            </>
        );
    }
}
 
export default SortPlaylist;