require("dotenv").config();

var keys = require("./keys.js");

// Use the Spotify API and grabs the keys from keys.js
var spotifyKeys = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


var moment = require("moment");
moment().format();

// Axios to grab info
var axios = require("axios")

// FS to read the random.txt for the do-what-it-says function
var fs = require("fs");

var command = process.argv[2];
var value = process.argv[3];

switch (command) {
    case "concert-this":
        concertThis(value);
        break;
    
    case "spotify-this-song":
        spotifyThis(value);
        break;
    
    case "movie-this":
        movieThis(value);
        break;

    case "do-what-it-says":
        doThis(value);
        break;
};

// BandsInTown function here for "concertThis"
function concertThis(value) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function(response) {
            for (var i =0; i < response.data.length; i++) {

                var dateTime = response.data[i].datetime;
                var dateArray = datetime.split('T');

                var concertResults = 
                    "--------------------------------------------------------------------" + "\nVenue Name: " + response.data[i].venue.name + "\nLocation of venue: " + response.data[i].venue.city + "Date of event: " + moment(dateArray[0], "MM-DD-YYYY");
                console.log(concertResults);
            }

        })
        .catch(function(error) {
            console.log(error);
        });
} // CLOSES concertThis function

function spotifyThis(value) {
    if (!value) {
        value = "The Sign";
    }
    spotify.search({ type: "track", query: value }).then(function(response) {
        for (var i = 0; i < 5; i++) {
            var spotifyResults = 
            "--------------------------------------------------------------------" + "\nArtist(s): " + response.tracks.items[i].artists[0].name + "\nSong Name: " + response.tracks.items[i].name + "\nPreview Link: " + response.tracks.items[i].preview_url + "\nAlbum: " + response.tracks.items[i].album.name;

        console.log(spotifyResults);        
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}// CLOSES spotifyThis function

function movieThis(value) {
    if (!value) {
        value = "Mr. Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
}




