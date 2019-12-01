import fetch from 'node-fetch';
const SpotifyApiWrapper = {

    fetchTopArtists: async function (access_token) {
        const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
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
                'Authorization': 'Bearer ' + access_token,
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
                'Authorization': 'Bearer ' + access_token,
            }
        });
        const result = await response.json();
        console.log('NEW RELEASES: ', result)
        return result.albums.items;
    },

    fetchFeaturedPlaylists: async function (access_token) {
        const response = await fetch('https://api.spotify.com/v1/browse/featured-playlists', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
            }
        });
        const result = await response.json();
        console.log('FEATURED PLAYLISTS: ', result.playlists)
        return result.playlists.items;
    },

    fetchUserProfile: function (access_token, templateName, ) {
        fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            }
        }).then(response => {
            response.json().then(json => {
                //TODO return the json here for rendering
            }).catch(error => {
                console.log('ERROR:', error);
            });
            //TODO replace the jQUery hide stuff with templated 'if'
        });
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
    }
}

export default SpotifyApiWrapper;