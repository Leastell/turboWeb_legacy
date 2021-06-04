import React, { Component } from 'react';
import { getThumbnail } from '../scripts/API'
import { Link } from 'react-router-dom';
import emptyAlbum from '../img/misc/emptyalbum.png'
var datejs = require('datejs')

class PlaylistIcon extends Component {
    state = { 
        images : [],
        isLoading: true
     }

    render() {
        let startDate = new Date(this.props.playlistDate);
        startDate = startDate.add(1).day()
        let endDate = new Date(startDate)
        endDate = endDate.add(6).day()

        var now = new Date();

        let current = false

        if(endDate >= now){
            current = true
        }

        const linkTarget = "/music/"+this.props.playlistDate

        return (
            this.state.isLoading ? <></> :
            <Link to={linkTarget} className="playlistIcon">
                <div className="albumGrid">
                    {this.state.images.map((image, index) => {
                        index = index+1;

                        let imgStyle = {}
                        
                        if(image!="none"){
                            imgStyle = {
                                backgroundImage: 'url('+image+')'
                            }
                        }
                        else{
                            imgStyle = {
                                backgroundImage: 'url('+emptyAlbum+')'
                            }
                        }

                        let element = <div style = {imgStyle} alt = "album art" key={startDate.toString("MMM dd, yyyy")+"art"+index}></div>
                        
                        return element
                    }) }
                </div>
                {current ? 
                <div className="dateIndicator">
                    Current
                </div>: 
                <div className="dateIndicator">
                    {startDate.toString("MMM dd")} - {endDate.toString("MMM dd")}
                </div>
                }
            </Link>
         );
    }
}
 
export default PlaylistIcon;