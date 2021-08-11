import React, { Component } from 'react';
import PlaylistIcon from '../components/playlisticon';
import Loader from '../components/loader'
import { getPlaylists, getPlaylistData } from '../scripts/API'
import DiscordButton from '../components/discordbutton'
import ShowcaseIcon from '../components/showcaseicon'
import UserLeaderboard from '../components/userLeaderboard'
import Flickity from 'react-flickity-component'

class MusicPage extends Component {
    state = { 
        isLoading: true,
        showcasePlaylists: ["5GGM872Q1jVXktaEOQxmp7", "27KQZuHHIJIXdSIdX5gwNr", "37HPMMo78q4NF4EuiD1nm2"]
    }

    playlistIcons = []

    async componentDidMount(){
        const fetchedPlaylists = await getPlaylists()
        console.log(fetchedPlaylists);
        let lastDate = ""

        for (const index in fetchedPlaylists) {
            if(lastDate != fetchedPlaylists[index].substring(0,4)){
                let keyval = "divider"+index
                if(lastDate != ""){
                    this.playlistIcons.push(<div className="divider" key={keyval}><span>{lastDate}</span></div>)
                }
                lastDate = fetchedPlaylists[index].substring(0,4)
            }
            this.playlistIcons.push(<PlaylistIcon key={fetchedPlaylists[index]} playlistDate={fetchedPlaylists[index]}/>)
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
                <div className="heading space">User Leaderboard</div>
                <UserLeaderboard />
                <div className="heading space">Playlist Archive</div>
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