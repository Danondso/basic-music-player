import fetch from 'node-fetch';
import Logger from '../util';

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

    fetchUserProfile: async function (access_token) {
        const response = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token,
            }
        });
        const result = await response.json();
        Logger.debug('USER PROFILE: ', JSON.stringify(result))
        return result;
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
        Logger.debug('ALBUM: ', JSON.stringify(result))
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
        Logger.debug('ARTIST: ', JSON.stringify(result));
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
        Logger.debug('RELATED ARTISTS: ', JSON.stringify(result))
        return result;
    },

    fetchTopTracks: async function (access_token, id) {
        const response = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=from_token`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token,
            }
        });
        const result = await response.json();
        Logger.debug('ALBUM: ', JSON.stringify(result))
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
        Logger.debug('ALBUM: ', JSON.stringify(result))
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
        let profile = await this.fetchUserProfile(access_token);

        return {
            profile: profile,
            recentlyPlayed: recentlyPlayed,
            newReleases: newReleases,
            topArtists: topArtists,
            featuredPlaylists: featuredPlaylists
        }
    },

    fetchArtistProfileData: async function (access_token, artistId) {
        let artist = await this.fetchArtist(access_token, artistId);
        // TODO probably a better way to handle this
        let topTracks = await this.fetchTopTracks(access_token, artistId);
        let relatedArtists = await this.fetchRelatedArtists(access_token, artistId);
        let albums = await this.fetchArtistAlbums(access_token, artistId);

        return {
            artist: artist, 
            relatedArtists: relatedArtists, 
            albums: albums,
            topTracks: topTracks
        }
    }
}

export default SpotifyApiWrapper;