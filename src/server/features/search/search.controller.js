import SpotifyApiWrapper from '../../core/api/spotify-api';
import Logger from '../../core/util';

const SearchController = {
    // TODO have search occur after > 3 characters
    // bake it into the navbar
    search: function (req, res) {
        console.log('Query:', req.query.query);
        let access_token = req.cookies.access_token;
        SpotifyApiWrapper.search(access_token, req.query.query).then(result => {
            const artists = result.artists.items;
            const albums = result.albums.items;
            const tracks = result.tracks.items;
            Logger.info(tracks);
            Logger.info('Search result:', result);
            res.render('search-results', {
                result: JSON.stringify(result)
            });

            // component for artists
            // compoenent for albums
            // component for tracks
        })

    }
}

export default SearchController;