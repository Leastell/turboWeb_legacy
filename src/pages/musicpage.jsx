import React, { Component } from 'react';
import PlaylistIcon from '../components/playlisticon';
import Loader from '../components/loader'
import { getPlaylists, getPlaylistData } from '../scripts/API'
import DiscordButton from '../components/discordbutton'
import ShowcaseIcon from '../components/showcaseicon'
import Flickity from 'react-flickity-component'

class MusicPage extends Component {
    state = { 
        isLoading: true,
        showcasePlaylists: ["5GGM872Q1jVXktaEOQxmp7", "27KQZuHHIJIXdSIdX5gwNr", "3TJxAkWtRy2AlNcWylHbMD"]
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

        let showcaseIcons = []

        for (const index in this.state.showcasePlaylists) {
            let playlistID = this.state.showcasePlaylists[index];
            let data = await getPlaylistData(playlistID);
            showcaseIcons.push(<ShowcaseIcon className="carousel-cell" key={playlistID} playlistid={playlistID} data={data}/>)
        }

        this.setState({
            isLoading: false,
            showcaseIcons
        })

    }

    render() {

        return ( 
        <>
            {this.state.isLoading ? <Loader /> : 
            <>
                <Flickity className="ignorePad"
                options={{
                    prevNextButtons: false,
                    initialIndex: 1,
                    static: true
                }}
                >
                     {this.state.showcaseIcons}
                </Flickity>
                <div className="heading">Playlist Archive</div>
                <div className="playlistFlow ">
                    {this.playlistIcons}
                </div>
            </>}
            <DiscordButton />
        </> 
        );
    }
}
 
export default MusicPage;