import React, { Component } from 'react';
import DiscordUser from './discorduser';
import VoteButton from './votebutton';
import { Link } from 'react-router-dom';
import emptyAlbum from '../img/misc/emptyalbum.png'

class trackView extends Component {

    render() {
        const track = this.props.trackObj;
        if(track.name !== ''){

            const albumArtStyle = {
                backgroundImage: 'url('+track.album.images[1].url+')'
            }

            return (<div className="track" >
                <div className='album_art' style={ albumArtStyle }></div>
                <a href={"https://open.spotify.com/track/"+track.id}>
                    <div className="spotify_overlay"></div>
                </a>
                <div className="track_info">
                    { <div className='track_name'> {track.name} </div> }
                    { <div className='artist_name'> {track.album.artists[0].name} </div> }
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