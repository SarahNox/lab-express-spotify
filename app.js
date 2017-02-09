// const SpotifyWebApi   = require('spotify-web-api-node');
// const spotify         = new SpotifyWebApi();
// const express = require('express');
// const app = express();
// const expressLayouts = require('express-ejs-layouts');
// const bodyParser = require('body-parser');
// const morgan     = require('morgan');
//
// app.set('views', __dirname + "/views");
// app.set('view engine', 'ejs');
// app.set('layout', 'layouts/main-layout');
//
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.use(expressLayouts);
// app.use(morgan('dev'));
//
// spotify.searchArtists("The Beatles", {}, (err, data) => {
//   if (err) throw err;
//
//   let artists = data.body.artists.items;
//   console.log(artists)
// });
//
// app.get('/artists', (req, res) => {
//   res.render('artists');
// });
//
// // app.post('/artists', (req, res) => {
// //   let artist    = req.body.artist;
// //   res.send(`Artist: ${artist}`);
// // });
//
// app.post('/artists', function(req, res) {
//   let artist = req.body.artist;
//   console.log(artist);
//   spotify.search(artist).then(function (response) {
//     console.log(response);
//   }).catch(function(err) {
//     console.log("not found");
//   })
// });

const bodyParser = require('body-parser');
const morgan = require('morgan');

const SpotifyWebApi = require('spotify-web-api-node');
const spotify = new SpotifyWebApi();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

app.use(expressLayouts);
app.set('layout','layouts/main-layout');

app.set('views', __dirname + "/views");
app.set('view engine','ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/artists', (req, res) => {
	let artistName = req.query.artist;

		spotify.searchArtists(artistName, {}, (err, response) => {
		  if (err) throw err;

		  let artists = response.body.artists.items;
		  console.log(artists[0]);

			let data = {
				artists: artists
			}

			res.render('artists',data);
		});
});

app.get('/albums/:artistId', function(req, res, next) {
	let artist = req.query.artist;

	spotify.getArtistAlbums(artistId, {}, (err, response) => {
		if (err) throw err;
		let albums = response.body.items;
		let artist= albums[0].artists.find(artist => artist.id === artistId);
		console.log(albums[0]);

	 res.render('albums/index',{albums : albums, artist: artist.name});
 });
});

app.listen(3000, () => {
  console.log('port 3000 in use')
});
