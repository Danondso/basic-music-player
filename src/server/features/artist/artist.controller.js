import SpotifyApiWrapper from '../../core/api/spotify-api';

const ArtistController = {
    renderArtistProfile: function (req, res) {
        console.log('ARTIST ID:', req.params.id);
        let access_token = req.cookies.access_token;
        SpotifyApiWrapper.fetchArtist(access_token, req.params.id).then(result => {
            res.render('artist', {
                artistBackgroundImage: result.images[0].url
            });
        })

    }
}

export default ArtistController;