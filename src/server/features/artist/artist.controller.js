import SpotifyApiWrapper from '../../core/api/spotify-api';

const ArtistController = {
    renderArtistProfile: function (req, res) {
        console.log('ARTIST ID:', req.params.id);
        let access_token = req.cookies.access_token;
        SpotifyApiWrapper.fetchArtist(access_token, req.params.id)
        res.render('artist');
    }
}

export default ArtistController;