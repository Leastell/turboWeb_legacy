import React, { Component } from 'react';
import PlaylistIcon from '../components/playlisticon';
import Loader from '../components/loader'
import { getPlaylists } from '../scripts/database'

class MusicPage extends Component {
    state = { 
        isLoading: true, 
        
    }

    async componentDidMount(){
        let playlists = []

        const fetchedPlaylists = await getPlaylists()

        for (const playlistDate in fetchedPlaylists) {
            if (fetchedPlaylists.hasOwnProperty(playlistDate)) {
                playlists.push(fetchedPlaylists[playlistDate])
            }
        }

        this.setState({
            isLoading: false,
            playlists: playlists
        })

    }

    render() {
        return ( 
        <div>
            <div className="heading">Playlists</div>
            {this.state.isLoading ? <Loader /> : 
            <div className="playlistFlow">
                {this.state.playlists.map(playlist => <PlaylistIcon key={playlist} playlistDate={playlist} />) }
            </div>}
        </div> 
        );
    }
}
 
export default MusicPage;