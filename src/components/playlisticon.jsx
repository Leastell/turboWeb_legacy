import React, { Component } from 'react';
import { getThumbnail } from '../scripts/API'
import { Link } from 'react-router-dom';
var datejs = require('datejs')

class PlaylistIcon extends Component {
    state = { 
        images : [],
        isLoading: true
     }

    async componentDidMount(){
        let images = []

        const thumbnailObj = await getThumbnail(this.props.playlistDate)

        for (const key in thumbnailObj) {
            if (thumbnailObj.hasOwnProperty(key)) {
                const element = thumbnailObj[key];
                images.push(element.url)
            }
        }
        this.setState({ images, isLoading: false })
    }

    render() {
        let startDate = new Date(this.props.playlistDate);
        let endDate = new Date(startDate)
        endDate = endDate.add(6).day()

        const linkTarget = "/music/"+this.props.playlistDate

        return (
            this.state.isLoading ? <></> :
            <Link to={linkTarget} className="playlist_icon">
                <div className="albumGrid">
                    {this.state.images.map((image, index) => {
                        index = index+1;
                        return <img src = {image} alt = "album art" key={startDate.toString("MMM dd, yyyy")+"art"+index}/>
                    }) }
                </div>
                <div className="dateIndicator">{startDate.toString("MMM dd, yyyy")} - {endDate.toString("MMM dd, yyyy")}</div>
            </Link>
         );
    }
}
 
export default PlaylistIcon;