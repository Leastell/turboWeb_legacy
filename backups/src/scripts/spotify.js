import { getPlaylist } from './database' 

const fetch = require("node-fetch");

let clientId = '9f42f042e0d94286b7cf2ec4fb821b92';
let clientSecret = '1151504d06e84372b0382664fa6af441';

let weeklyPlaylist = '27KQZuHHIJIXdSIdX5gwNr';
// let weeklyPlaylist = 'rJq50KhyRfeEu7fInwdf6w'

const getToken = async () => {

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
}

const getPlaylistByID = async (token, playlistID) => {
  
  const result = await fetch('https://api.spotify.com/v1/playlists/'+playlistID+'/tracks', {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
  });

  const data = await result.json();
  return data.items;
}

async function getTrackByID(token, trackID){

  const result = await fetch('https://api.spotify.com/v1/tracks/'+trackID, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
  });

  const data = await result.json();
  return data;

}

async function getTracksByID(playlistID){
  let tracks = [];
  let token = await getToken();
  let playlist = await getPlaylistByID(token, playlistID);
  for (const key in playlist) {
    if (playlist.hasOwnProperty(key)) {
      const item = playlist[key];
      tracks.push(item);
    }
  }
  return tracks;
}

async function getTracksByDate(date){
  let tracks = [];
  let token = await getToken();

  let loggedTracks = await getPlaylist(date)

  for (const trackNum in loggedTracks) {
    let pullTrack = await getTrackByID(token, loggedTracks[trackNum]['trackID'])
    tracks.push(pullTrack)
  }

  return tracks

}

async function getTrackArt(token, trackID){

  const result = await fetch('https://api.spotify.com/v1/tracks/'+trackID, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
  });

  const data = await result.json();
  
  return data['album']['images'][1].url

}

export { getTracksByID, getTracksByDate, weeklyPlaylist, getToken as _getToken, getTrackArt}