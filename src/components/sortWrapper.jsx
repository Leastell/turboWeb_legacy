import React, { Component } from 'react';
import SortPlaylist from './sortPlaylist';
import Loader from './loader'
import IconButton from './iconButton'


class SortWrapper extends Component {
    state = { 
        isLoading: true,
        sortMode: "time",
        sortDirection: "linear",
        buttonStatus: [0, 0]
    }

    async componentDidMount(){
        let plElement = <SortPlaylist origin="date" originVal="2021-01-11" sortBy="linear" loadFunc={this.updateLoad}></SortPlaylist>

        let iconButtons = [
            <IconButton key="time" sortBy="time" updateFunc={this.sortChange} status={this.state.buttonStatus[0]}/>,
            <IconButton key="votes" sortBy="votes" updateFunc={this.sortChange} status={this.state.buttonStatus[1]}/>
        ]

        this.setState({
            plElement,
            iconButtons
        })
    }

    updateLoad = () => {
        this.setState({
            isLoading: false
        })
    }
    
    sortChange = (sortBy) => {
        console.log(sortBy + " called");
        console.log(this.state.buttonStatus);

        if(sortBy==="time"){
            this.setState({
                buttonStatus: [1,0]
            }, () => {
                console.log(this.state.buttonStatus);
            })
        }
    }

    render() { 
       

        return ( 
        <>  
            { this.state.isLoading ? <Loader /> : 
                <div className="sort-buttons">
                    {this.state.iconButtons}
                </div>
            }

            {this.state.plElement}
        </> 
        );
    }
}
 
export default SortWrapper;