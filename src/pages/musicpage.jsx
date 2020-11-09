import React, { Component } from 'react';
import PlaylistIcon from '../components/playlisticon';
import Loader from '../components/loader'
import { getPlaylists } from '../scripts/API'

class MusicPage extends Component {
    state = { 
        isLoading: true, 
    }

    async componentDidMount(){
        const fetchedPlaylists = await getPlaylists()
        let playlists = []

        for (const index in fetchedPlaylists) {
            if (fetchedPlaylists.hasOwnProperty(index)) {
                playlists.push(fetchedPlaylists[index])
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