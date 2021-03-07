import React, { Component } from 'react';
import DownIcon from '../img/icons/arrow-down.svg'
import UpIcon from '../img/icons/arrow-up.svg'
import ClockIcon from '../img/icons/clock.svg'
import StarIcon from '../img/icons/star.svg'

class IconButton extends Component {
    state = {
        isLoading: true,
    }

    async componentDidMount(){
        const icon = this.getIcon();
        let locked = false;

        let iconCycle = [
           [<img key={this.props.sortBy} className="icon-button" src={icon} alt="sort by time"/>],
           [<img key={this.props.sortBy} className="icon-button active" src={icon} alt="sort by time"/>, 
           <img key="down" className="icon-button active" src={DownIcon} alt="down arrow"/>],
           [<img key={this.props.sortBy} className="icon-button active" src={icon} alt="sort by time"/>, 
           <img key="up" className="icon-button active" src={UpIcon} alt="up arrow"/>]
        ]

        if(this.props.status===0){
            locked = true;
        }

        this.setState({
            iconCycle,
            isLoading: false,
            locked
        })
    }

    getIcon = () => {
        if(this.props.sortBy==="time"){
            return ClockIcon
        }
        else if(this.props.sortBy==="votes"){
            return StarIcon
        }
    }

    updateMe = (initial) => {
        
    }

    render() {

        return (
            <div className="icon-bundle" onClick={() => {
                this.updateMe(false)
                this.props.updateFunc(this.props.sortBy)
            }}>
            {this.state.isLoading ? <></> : 
                this.state.locked ? this.state.iconCycle[0] :
                    this.state.iconCycle[1]
            }
            </div>
        );
    }s
}

export default IconButton;