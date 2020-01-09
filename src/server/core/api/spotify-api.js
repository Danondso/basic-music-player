import fetch from 'node-fetch';
const SpotifyApiWrapper = {

    fetchTopArtists: async function (access_token) {
        const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token,
            }
        });
        const result = await response.json();
        return result.items;
    },

    fetchRecentlyPlayed: async function (access_token) {
        const response = await fetch('https://api.spotify.com/v1/me/player/recently-played', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token,
            }
        });
        const result = await response.json();
        return result.items;
    },

    fetchNewReleases: async function (access_token) {
        const response = await fetch('https://api.spotify.com/v1/browse/new-releases', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token,
            }
        });
        const result = await response.json();
        return result.albums.items;
    },

    fetchFeaturedPlaylists: async function (access_token) {
        const response = await fetch('https://api.spotify.com/v1/browse/featured-playlists', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token,
            }
        });
        const result = await response.json();
        return result.playlists.items;
    },

    fetchUserProfile: function (access_token) {
        fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token
            }
        }).then(response => {
            response.json().then(json => {}).catch(error => {
                console.log('ERROR:', error);
            });
            //TODO replace the jQUery hide stuff with templated 'if'
        });
    },

    fetchAlbum: async function (access_token, id) {
        const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token,
            }
        });
        const result = await response.json();
        console.log('ALBUM: ', JSON.stringify(result))
        return result;
    },

    fetchArtist: async function (access_token, id) {
        const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token,
            }
        });
        const result = await response.json();
    //    console.log('ARTIST: ', JSON.stringify(result))
        return result;
    },

    fetchRelatedArtists: async function (access_token, id) {
        const response = await fetch(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token,
            }
        });
        const result = await response.json();
        console.log('RELATED ARTISTS: ', JSON.stringify(result))
        return result;
    },

    fetchTopTracks: async function (access_token, id) {
        const response = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token,
            }
        });
        const result = await response.json();
        console.log('ALBUM: ', JSON.stringify(result))
        return result;
    },

    fetchArtistAlbums: async function (access_token, id) {
        const response = await fetch(`https://api.spotify.com/v1/artists/${id}/albums`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token,
            }
        });
        const result = await response.json();
      //  console.log('ALBUM: ', JSON.stringify(result))
        return result;
    },

    refreshToken: function (refresh_token) {
        fetch('/refresh_token', {
            method: 'POST',
            body: JSON.stringify({
                'refresh_token': refresh_token
            }),
        }).then(response => {
            response.json().then(json => {
                return json.access_token;
            });
        });
    },

    fetchHomeData: async function (access_token) {
        let featuredPlaylists = await this.fetchFeaturedPlaylists(access_token);
        let topArtists = await this.fetchTopArtists(access_token);
        let newReleases = await this.fetchNewReleases(access_token);
        let recentlyPlayed = await this.fetchRecentlyPlayed(access_token);

        return {
            recentlyPlayed: recentlyPlayed,
            newReleases: newReleases,
            topArtists: topArtists,
            featuredPlaylists: featuredPlaylists
        }
    },

    fetchArtistProfileData: async function (access_token, artistId) {
        let artist = await this.fetchArtist(access_token, artistId);
        // TODO probably a better way to handle this 
        let relatedArtists = await this.fetchRelatedArtists(access_token, artistId);
        let albums = await this.fetchArtistAlbums(access_token, artistId);

        return {
            artist: artist, 
            relatedArtists: relatedArtists, 
            albums: albums
        }
    }
}

export default SpotifyApiWrapper;