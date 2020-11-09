const fetch = require("node-fetch");

weeklyPlaylist = "27KQZuHHIJIXdSIdX5gwNr"

let clientId = '9f42f042e0d94286b7cf2ec4fb821b92';
let clientSecret = '1151504d06e84372b0382664fa6af441';

const config = require('../config.js');
var mysql = require('mysql');

var con = mysql.createConnection(config.connectionInfo);

const addTracks = (tracks, date) => {
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    for (const tracknum in tracks) {
      if (tracks.hasOwnProperty(tracknum)) {
        const track = tracks[tracknum].track;
        var sql = "INSERT INTO tracks (trackID, playlistDate) VALUES ('"+track.id+"', '"+date+"')";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
      }
    }
  });
}


const _getToken = async () => {

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

async function getTracksByID(playlistID){
let tracks = [];
let token = await _getToken();
let playlist = await getPlaylistByID(token, playlistID);
for (const key in playlist) {
    if (playlist.hasOwnProperty(key)) {
    const item = playlist[key];
    tracks.push(item);
    }
}
return tracks;
}


  
// This function will insert the weekly songs into the table by date.
const insertWeekly = async () => {
    let items = await getTracksByID(weeklyPlaylist);
    addTracks(items, "2020-09-28").then(
        console.log("Done!")
    );
    console.log("Done!");
  }
  
  insertWeekly()