const axios = require('axios')
const config = require('../config')

export async function getThumbnail(date){
    const result = await axios({
        method: 'get',
        url: config.APIhostname+'/playlists/'+date+'/thumbnail',
        headers: {"Access-Control-Allow-Origin": "*"}
    }).catch( err => {
        console.log(err);
    });

    const data = result.data
    return data
}

export async function getPlaylist(date){
    const result = await axios({
        method: 'get',
        url: config.APIhostname+'/playlists/'+date,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).catch( err => {
        console.log(err);
    });

    const data = result.data
    return data
}

export async function getPlaylists(){

    const result = await axios({
        method: 'get',
        url: config.APIhostname+'/playlists',
        headers: {"Access-Control-Allow-Origin": "*"}
    }).catch( err => {
        console.log(err);
    });

    const data = result.data
    return data
}

export async function getUser(userID){
    const result = await axios({
        method: 'get',
        url: config.APIhostname+'/users/'+userID,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).catch( err => {
        console.log(err);
    });

    const data = result.data
    return data
}

export async function getPlaylistData(playlistID){

    const result = await axios({
        method: 'get',
        url: config.APIhostname+'/playlists/spotify/'+playlistID,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).catch( err => {
        console.log(err);
    });

    const data = result.data
    return data
}

export async function changeVote(trackID, mode){
    const result = await axios({
        method: 'put',
        url: config.APIhostname+'/tracks/votes',
        headers: {"Access-Control-Allow-Origin": "*"},
        data: {
            trackID: trackID,
            mode: mode
        }
    }).catch( err => {
        console.log(err);
    });

    const data = result.data
    console.log(data);
}

export async function submitSanta(obj){
    const result = await axios({
        method: 'put',
        url: config.APIhostname+'/events/santas',
        headers: {"Access-Control-Allow-Origin": "*"},
        data: {
            santaObj: JSON.stringify(obj),
        }
    }).catch( err => {
        console.log(err);
    });

    const data = result.data
    console.log(data);
}

export async function getUserLeaderboard(){

    const result = await axios({
        method: 'get',
        url: config.APIhostname+'/leaderboards/users',
        headers: {"Access-Control-Allow-Origin": "*"}
    }).catch( err => {
        console.log(err);
    });

    const data = result.data
    return data
}