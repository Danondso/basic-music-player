import SpotifyApiWrapper from '../../core/api/spotify-api';
import Logger from '../../core/util';

const ArtistController = {
    renderArtistProfile: function (req, res) {
        console.log('ARTIST ID:', req.params.id);
        let access_token = req.cookies.access_token;
        SpotifyApiWrapper.fetchArtistProfileData(access_token, req.params.id).then(result => {
            Logger.debug('ARTIST PROFILE RESULT:', result);
            result.relatedArtists.artists = result.relatedArtists.artists.slice(0, 4);
            res.render('artist', {
                artistName: result.artist.name,
                artistBackgroundImage: result.artist.images[0].url,
                relatedArtists: result.relatedArtists,
                topTracks: result.topTracks
            });
        })

    }
}

export default ArtistController;