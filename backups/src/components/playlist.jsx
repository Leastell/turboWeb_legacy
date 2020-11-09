import React, { Component } from 'react'
import { getTracksByDate} from '../scripts/spotify'
import { getPlaylist } from '../scripts/database'
import { getNicknames } from '../scripts/discordAPI'
import Track from './track'
import Loader from './loader'

class Playlist extends Component {
    state = { 
        isLoading: true,
        playlistDate : '',
        items: [],
        previous: '',
        storedVotes: []
    }
    
    async componentDidMount(){

        let playlistDate= this.props.match.params.playlistDate
        
        let spotifyItems = await getTracksByDate(playlistDate)
        let turboItems = await getPlaylist(playlistDate)
        
        if (spotifyItems.length !== turboItems.length){
            throw new Error("Spotify playlist length does not match what we have logged!");
        }
        
        let contributorIDs = []
        for (const index in turboItems) {
            contributorIDs.push(turboItems[index]['addedBy'])
        }
        
        let contributors = await getNicknames(contributorIDs)
        
        for (const index in spotifyItems) {
            spotifyItems[index]['contributor'] = contributors[index]
            spotifyItems[index]['votes'] = turboItems[index]['votes']
        }
        
        const voteState = localStorage.getItem('trackVotes') ? (JSON.parse(localStorage.getItem('trackVotes'))) : [];

        this.setState({
            isLoading: false,
            items: spotifyItems,
            storedVotes : voteState
        })
    }
    
    updateStorage = (trackID) => {
        
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
            voteClone.push(trackID);
        }
        

        this.setState({
            storedVotes : voteClone
        })

        localStorage.setItem('trackVotes', JSON.stringify(voteClone))
    }

    render() {

        return (
            <div className="playlist">
                {this.state.isLoading ? <Loader /> : 
                <div>
                    {this.state.items.map(track => <Track key={track.id} trackObj={track} storageFunction={this.updateStorage} voteStatus={this.state.storedVotes.includes(track.id)} />) }
                </div>}
            </div>);
        }
}
 
export default Playlist;