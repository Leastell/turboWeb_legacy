import React, { Component } from 'react';
import {AiOutlineStar, AiFillStar} from 'react-icons/ai';

class VoteButton extends Component {
    state = { 
        active: false,
        icon: <AiOutlineStar />,
        votes: 0
    }

    async componentDidMount(){

        if(this.props.voteStatus){
            let active = !this.state.active
            let icon = active ? <AiFillStar /> : <AiOutlineStar />
            this.setState({
                active,
                icon
            })
        }

        this.setState({
            votes: this.props.votes
        })
    }

    toggleVote = () => {
        let active = !this.state.active
        let icon = active ? <AiFillStar /> : <AiOutlineStar />
        let votes = this.state.votes + 0;
        if(active){
            votes = votes + 1;
        }
        else{
            votes = votes - 1;
        }

        this.props.storageFunction(this.props.trackID)

        this.setState({
            active,
            icon,
            votes
        })
    }

    render() { 
        const element = <div className={this.state.active ? 'active' : 'inactive'} onClick={this.toggleVote}>
            <p className="icon">{this.state.icon}</p>
            <p className="vote_count">{this.state.votes}</p>
        </div>
        return ( element );
    }
}
 
export default VoteButton;