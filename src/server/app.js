import express from 'express';
import request from 'request';
import cors from 'cors';
import querystring from 'querystring';
import cookieParser from 'cookie-parser';
import exphbs from 'express-handlebars';
import SpotifyApiWrapper from './spotify-api';
require('dotenv').config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

var stateKey = 'spotify_auth_state';

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('src/public'))
  .use(cors())
  .use(cookieParser());

var hbs = exphbs.create({
  /* config */
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/login', function (req, res) {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);
  // your application requests authorization
  const scope = 'user-read-private user-read-email user-read-recently-played user-top-read';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/album/:id', function (req, res) {
  let access_token = req.cookies.access_token;
  SpotifyApiWrapper.fetchAlbum(access_token, req.params.id).then(result => {
    res.render('album', {
      albumImage: result.images[1].url,
      albumName: result.name,
      artistName: result.artists[0].name,
      trackCount: result.tracks.items.length,
      duration: calculateTotalAlbumTime(result.tracks.items),
      tracks: result.tracks,
      albumId: req.params.id,
      copyright: result.copyrights[0].text
    })
  });
});

function calculateTotalAlbumTime(tracks) {
  let durationMs = 0;
  tracks.forEach(element => {
    durationMs += element.duration_ms
  })
  return Math.floor(durationMs / 60000);
}

app.get('/', function (req, res) {
  res.render('login')
});

app.get('/home', function (req, res) {
  renderHomePanel(res, req.cookies.access_token)
});

app.get('/callback', function (req, res) {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
      },
      json: true
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let access_token = 'Bearer ' + body.access_token;
        let refresh_token = body.refresh_token;
        res.cookie('access_token', access_token, {
          expires: new Date(Date.now() + 8 * 3600000),
        })
        res.cookie('refresh_token', refresh_token, {
          expires: new Date(Date.now() + 8 * 3600000),
        })
        renderHomePanel(res, access_token);
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
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

app.get('/refresh_token', function (req, res) {
  let refresh_token = req.query.refresh_token;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

console.log('Listening on 8888');
app.listen(8888);