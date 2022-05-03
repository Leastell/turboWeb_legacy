import React, { Component } from 'react';
import DiscordUser from './discorduser';
import VoteButton from './votebutton';
import { Link } from 'react-router-dom';
import emptyAlbum from '../img/misc/emptyalbum.png'
const datejs = require('datejs')

class trackView extends Component {

    state = {
        linkTarget: "",
        dateLabel: ""
    }

    async componentDidMount(){
        if(this.props.playlistDate){
            let startDate = new Date(this.props.playlistDate);
            startDate = startDate.add(1).day()
            let endDate = new Date(startDate)
            endDate = endDate.add(6).day()

            var now = new Date();

            let current = false

            if(endDate >= now){
                current = true
            }

            let linkTarget = "/music/"+this.props.playlistDate
            let dateLabel = startDate.toString("MMMM yyyy")

            this.setState({
                linkTarget,
                dateLabel
            })
        }

        
    }

    render() {
        const track = this.props.trackObj;
        if(track.name !== ''){

            const albumArtStyle = {
                backgroundImage: 'url('+track.album.images[1].url+')'
            }

            return (<div className="track" >
                <div className='album_art' style={ albumArtStyle }></div>
                <a href={"https://open.spotify.com/track/"+track.id} target="none">
                    <div className="spotify_overlay"></div>
                </a>
                <div className="track_info">
                    <a href={"https://open.spotify.com/track/"+track.id} target="none">
                        <div className='track_name'> {track.name} </div>
                    </a>
                    <a href={"https://open.spotify.com/artist/"+track.album.artists[0].id} target="none">
                        <div className='artist_name'> {track.album.artists[0].name} </div>
                    </a>
                    { this.props.playlistDate ?
                    <Link to={this.state.linkTarget} className="no_link">
                        <div className="playlist_date">
                            {this.state.dateLabel}
                        </div>
                    </Link> : <></> }
                    { track.contributor ?
                    <Link to={"/music/user/"+track.contributor.user.id} className="no_link">
                        <DiscordUser userObj={track.contributor} />
                    </Link> : <></> }
                </div>
                { this.props.storageFunction ? 
                <div className='vote_button'>
                    <VoteButton trackID={track.id} votes={track.votes} voteStatus={this.props.voteStatus} storageFunction = {this.props.storageFunction}/>
                </div> : <></> }
            </div>);
        }
        else{
            const albumArtStyle = {
                backgroundImage: 'url('+emptyAlbum+')'
            }
            return (<div className="track" >
                
                <div className='album_art' style={ albumArtStyle }></div>
                <a href={"https://open.spotify.com/track/"+track.id}>
                    <div className="spotify_overlay"></div>
                </a>
                <div className="track_info">
                    { <div className='track_name'> Deleted Track </div> }
                    { <div className='artist_name'> </div> }
                    { track.contributor ?
                    <Link to={"/music/user/"+track.contributor.user.id} className="no_link">
                        <DiscordUser userObj={track.contributor} />
                    </Link> : <></> }
                </div>
                { this.props.storageFunction ? 
                <div className='vote_button'></div> : <></> }
            </div>);
        }

    }
}
 
export default trackView;