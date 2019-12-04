import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import exphbs from 'express-handlebars';
import SpotifyApiWrapper from './core/api/spotify-api';
import authenticationRouter from './features/authentication/authentication.router';
import albumRouter from './features/album/album.router';

var app = express();

app.use(express.static('src/public'))
  .use(cors())
  .use(cookieParser());

var hbs = exphbs.create({
  /* config */
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(authenticationRouter);
app.use(albumRouter);

app.get('/home', function (req, res) {
  renderHomePanel(res, req.cookies.access_token)
});

function renderHomePanel(res, access_token) {
  SpotifyApiWrapper.fetchHomeData(access_token).then(result => {
    res.render('home', {
      recentlyPlayedTitle: 'Recently Played',
      recentlyPlayedItems: result.recentlyPlayed,
      newReleaseTitle: 'New Releases',
      newReleaseItems: result.newReleases,
      featuredPlaylistsTitle: 'Featured Playlists',
      featuredPlaylistItems: result.featuredPlaylists,
      topArtistsTitle: 'Top Artists',
      topArtistItems: result.topArtists,
    });
  });
}

console.log('Listening on 8888');
app.listen(8888);