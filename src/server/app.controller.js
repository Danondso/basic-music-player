import SpotifyApiWrapper from './core/api/spotify-api';

const AppController = {
    home: function (req, res) {
        renderHomePanel(res, req.cookies.access_token)
    },
    root: function (req, res) {
        res.render('landing-page');
    }
}

const renderHomePanel = function (res, access_token) {
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

export default AppController;