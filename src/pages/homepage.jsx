import React, { Component } from 'react';
import Logo from "../img/logo/turbo.svg"
import { Link } from 'react-router-dom';
import { getPlaylists } from '../scripts/API'
const datejs = require('datejs')

class HomePage extends Component {
           
    state = {
        isLoading: true
    }

    playlistLinks = []

    async componentDidMount(){
        const fetchedPlaylists = await getPlaylists()
        let lastDate = ""

        for (const index in fetchedPlaylists) {
            if(lastDate !== fetchedPlaylists[index].substring(0,4)){
                let keyval = "divider"+index
                if(lastDate !== ""){
                    this.playlistLinks.push(<div className="divider"><span>{lastDate}</span></div>)
                }
                lastDate = fetchedPlaylists[index].substring(0,4)
            }

            const playlistDate = fetchedPlaylists[index]
            const linkTarget = "/music/"+playlistDate

            let startDate = new Date(playlistDate).add(1).day()
            let endDate = new Date(startDate).add(6).day()

            let linkLabel =  startDate.toString("MMMM d")

            var now = new Date();

            if(endDate >= now){
                linkLabel = "This Week"
            }

            this.playlistLinks.push(
                <Link to={linkTarget} className="nolink">
                    <div className="dateLink">
                        <div className="date">
                            {linkLabel}
                        </div>
                    </div>
                </Link>
            )

        }

        this.playlistLinks.push(<div className="divider"><span>{lastDate}</span></div>)

        this.playlistLinks.reverse()    
        
        this.setState({
            isLoading: false
        })
    }

    render() {
        return ( 
            <div className = "homepage">
                <div className="main">
                    <Link to="/" className="nolink">
                        <img src={Logo} alt="Turbo Logo" className='logo'/>
                    </Link>
                    <div className="contentFlow">
                    </div>

                    <svg id="chromaWaves" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2226.58 850.31">
                        <path transform="translate(0 -370.69)" fill="red">
                            <animate attributeName='d' dur='1500ms' repeatCount='indefinite'
                            values='M1469.59,1221h721.32c-5.63-47.07-21.67-115.64-75.3-158-69.52-55-146.5-22-247.05-52.85-126.42-38.84-99.41-139.91-221.94-188.92-104-41.59-147.88,10.93-233.84-40.95-84.46-51-61.92-113.64-136.07-150.6-96.62-48.17-164,43.7-286.68,5.28C900.87,607,918.08,552.73,814.32,498.84c-127.41-66.18-272.84-46.42-342.16-37-136.82,18.59-177.48,62.77-241.76,29.06-49.56-26-63.55-72.26-137.4-101.72a266.54,266.54,0,0,0-93-18.5V1221Z;

                            M1469.59,1221h721.32c-5.63-47.07-53.38-49.59-107-92-69.52-55-120.63-155.46-221.18-186.35-126.42-38.85-126.6,4.17-249.13-44.84-104-41.6-69-114.69-155-166.57-84.47-51-160.59,10.66-234.75-26.31-96.61-48.17-90.2-81.88-212.89-120.3-89.16-27.92-156.3,10.38-260.06-43.52-127.42-66.18-209.43-88.69-278.75-79.26C335.34,480.44,326.39,481,262.1,447.31c-49.56-26-95.25-28.66-169.1-58.12a266.54,266.54,0,0,0-93-18.5V1221Z;

                            M1469.59,1221h721.32c-5.63-47.07-21.67-115.64-75.3-158-69.52-55-146.5-22-247.05-52.85-126.42-38.84-99.41-139.91-221.94-188.92-104-41.59-147.88,10.93-233.84-40.95-84.46-51-61.92-113.64-136.07-150.6-96.62-48.17-164,43.7-286.68,5.28C900.87,607,918.08,552.73,814.32,498.84c-127.41-66.18-272.84-46.42-342.16-37-136.82,18.59-177.48,62.77-241.76,29.06-49.56-26-63.55-72.26-137.4-101.72a266.54,266.54,0,0,0-93-18.5V1221Z;
                            '>
                            </animate>
                        </path>
                        <path transform="translate(0 -370.69)" fill="#00ffff">
                            <animate attributeName='d' dur='20000s' repeatCount='indefinite'
                            values='
                            M0,1221H2226.58a501.94,501.94,0,0,1-133.43-64.26c-93.65-63.92-114.23-126.28-181-182.31-86-72.17-138.76-30.09-258.94-89.83-98-48.72-89.48-110.37-183.63-149.29-84.37-34.87-128.26,28.23-220.63,9.25-100.36-20.62-86.89-100.25-185-144-127-56.66-209.64,39.55-355.37-2.64C602.62,567.23,600.88,495,511.79,448.64,426.16,404.07,276.78,389.92,0,550.36Z;

                            M0,1221H2226.58c-31.93-10-65.39-73.55-117.58-109.17-93.64-63.92-175-25.88-241.76-81.91-86-72.17-74-149-194.2-208.74-98-48.71-138.37,13.59-232.52-25.33C1356.15,761,1342.65,712,1250.29,693c-100.37-20.62-141.06,10.72-239.12-33-127-56.66-114.52-76.7-260.26-118.9-106-30.69-208.16-1.19-297.25-47.56C368,449,276.78,389.92,0,550.36Z;
                            '>
                            </animate>
                        </path>
                    </svg>
                </div>
                <div className="sidebar">
                    {this.state.isLoading ? <>Loading</> : 
                    this.playlistLinks
                    }
                    <div className="cover"></div>
                </div>
            </div>
        );
    }
}
 
export default HomePage;