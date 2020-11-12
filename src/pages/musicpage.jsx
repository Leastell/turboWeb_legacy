import React, { Component } from 'react';
import PlaylistIcon from '../components/playlisticon';
import Loader from '../components/loader'
import { getPlaylists } from '../scripts/API'
import DiscordButton from '../components/discordbutton'

class MusicPage extends Component {
    state = { 
        isLoading: true, 
    }

    playlistIcons = []

    async componentDidMount(){
        const fetchedPlaylists = await getPlaylists()

        for (const index in fetchedPlaylists) {
            if (fetchedPlaylists.hasOwnProperty(index)) {
                this.playlistIcons.push(<PlaylistIcon key={fetchedPlaylists[index]} playlistDate={fetchedPlaylists[index]}/>)
            }
        }

        this.playlistIcons.reverse()

        this.setState({
            isLoading: false
        })

    }


    render() {

        return ( 
        <div>
            <div className="heading">Playlist Archive</div>
            {this.state.isLoading ? <Loader /> : 
            <div className="playlistFlow">
                {this.playlistIcons}
            </div>}
            <DiscordButton />
        </div> 
        );
    }
}
 
export default MusicPage;