import SpotifyApiWrapper from '../../core/api/spotify-api';
import Logger from '../../core/util';

const AlbumController = {
    album: function (req, res) {
        let access_token = req.cookies.access_token;
        SpotifyApiWrapper.fetchAlbum(access_token, req.params.id).then(result => {
            res.render('album', {
                albumImage: result.images[1].url,
                albumName: result.name,
                artistId: result.artists[0].id,
                artistName: result.artists[0].name,
                trackCount: result.tracks.items.length,
                duration: convertMillisecondsToSeconds(result.tracks.items),
                tracks: result.tracks,
                albumId: req.params.id,
                copyright: result.copyrights[0].text
            })
        }).catch(error => {
            Logger.error(error);
        });
    }
}

const convertMillisecondsToSeconds = function (tracks) {
    let durationMs = 0;
    tracks.forEach(element => {
        durationMs += element.duration_ms
    })
    return Math.floor(durationMs / 60000);
}

export default AlbumController;