import React, { Component } from 'react';
import { getPlaylist } from '../scripts/database'
import { _getToken, getTrackArt } from '../scripts/spotify'
import { Link } from 'react-router-dom';
var datejs = require('datejs')

class PlaylistIcon extends Component {
    state = { 
        images : [],
        isLoading: true
     }

    async componentDidMount(){
        let tracks = await getPlaylist(this.props.playlistDate);
        let images = []
        for ( var i = 0; i < 4 ; i++ ){
            if(typeof tracks[i] !== 'undefined'){
                const trackID = tracks[i]['trackID']
                const token = await _getToken()
                let img = await getTrackArt(token, trackID)
                images.push(img)
            }
        }
        if(images.length != 4){
            for ( var i = 1; i < 4 ; i++ ){
                if(typeof images[i] === 'undefined'){
                    images[i] = images[i-1];
                }
            }
        }
        this.setState({ images, isLoading: false })
    }

    render() {
        let startDate = new Date(this.props.playlistDate);
        let endDate = new Date(startDate)
        endDate = endDate.add(6).day()

        const linkTarget = "/Music/"+this.props.playlistDate
        return (
            <Link to={linkTarget} className="playlist_icon">
                {this.state.isLoading ? <div className="albumLoader"></div> :
                <div className="albumGrid">
                    {this.state.images.map((image, index) => {
                        index = index+1;
                        return <img src = {image} alt = "album art" key={"art"+index}/>
                    }) }
                </div>}
                <div className="dateIndicator">{startDate.toString("MMM dd, yyyy")} - {endDate.toString("MMM dd, yyyy")}</div>
            </Link>
         );
    }
}
 
export default PlaylistIcon;