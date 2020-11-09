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
