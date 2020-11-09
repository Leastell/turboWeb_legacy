const config = require('../config.js');
const fetch = require("node-fetch");
var mysql = require('mysql');

var con = mysql.createConnection(config.connectionInfo);

const addTracks = (tracks, date) => {
  con.connect(function(err) {
    if (err) throw err;

    for (const tracknum in tracks) {
      if (tracks.hasOwnProperty(tracknum)) {
        const track = tracks[tracknum].track;
        var sql = "INSERT INTO tracks (trackID, playlistDate) VALUES ('"+track.id+"', '"+date+"')";
        con.query(sql, function (err, result) {
          if (err) throw err;
        });
      }
    }
  });
}

const cleanDate = (dirtyDate) =>{
  return dirtyDate.split("T05:00:00.000Z")[0]
}

const getPlaylists = async () => {
  let dates = []

  const result = await fetch(config.APIhostname+"/playlists")
  const playlists = await result.json();

  for (const playlist in playlists) {
    if (playlists.hasOwnProperty(playlist)) {
      const element = playlists[playlist];
      let date = cleanDate(element['playlistDate'])
      dates.push(date)
    }
  }

  return dates
}

// This gets a playlist ID given the date it was made on
const getPlaylist = async (date) => {
  const result = await fetch(config.APIhostname+"/playlists/"+date)
  const data = await result.json();
  return data
}

module.exports = { getPlaylists, getPlaylist }