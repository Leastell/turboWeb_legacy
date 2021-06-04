import React, { Component } from 'react';
import '../styles/events.css'
import Loader from '../components/loader'
import { getEvents } from '../scripts/API'

class Events extends Component {

    state = {
        isLoading: true
    }

    async componentDidMount(){
        let result = await getEvents()
        console.log(result);
    }

    render() { 
        return (<Loader />);
    }
}
 
export default Events;