const SpotifyWebApi   = require('spotify-web-api-node');
const spotify         = new SpotifyWebApi();
const  express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);

spotify.searchArtists("The Beatles", {}, (err, data) => {
  if (err) throw err;

  let artists = data.body.artists.items;
  console.log(artists)
});

app.get('/artists', (req, res) => {
  res.render('artists');
});

app.post('/artists', (req, res) => {
  let artist    = req.body.artist;
  res.send(`Artist: ${artist}`);
});

app.listen(3000, () => {
  console.log('My first app listening on port 3000!')
});
