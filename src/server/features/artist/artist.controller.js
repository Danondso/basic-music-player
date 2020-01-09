import SpotifyApiWrapper from '../../core/api/spotify-api';

const ArtistController = {
    renderArtistProfile: function (req, res) {
        console.log('ARTIST ID:', req.params.id);
        let access_token = req.cookies.access_token;
        SpotifyApiWrapper.fetchArtistProfileData(access_token, req.params.id).then(result => {
            //console.log('ARTIST NAME: ', result.relatedArtists)
            res.render('artist', {
                artistName: result.artist.name,
                artistBackgroundImage: result.artist.images[1].url,
                relatedArtists: result.relatedArtists
            });
        })

    }
}

export default ArtistController;