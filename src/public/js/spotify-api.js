var SpotifyApiWrapper = {

    fetchTopArtists: function (access_token) {
        fetch('https://api.spotify.com/v1/me/top/artists', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
            }
        }).then(response => {
            response.json().then(json => {
                this.renderTemplate('top-artists-template', 'top-artists-container', json);
            });
        });
    },

    fetchRecentlyPlayed: function (access_token) {
        fetch('https://api.spotify.com/v1/me/player/recently-played', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
            }
        }).then(response => {
            response.json().then(json => {
                this.renderTemplate('recently-played-template', 'recently-played-container', json);
            });
        });
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
                // TODO move the dom manipulation out to it's own function.
                // var userProfileSource = document.getElementById('user-profile-template').innerHTML,
                // userProfileTemplate = Handlebars.compile(userProfileSource),
                // userProfilePlaceholder = document.getElementById('user-profile');
                // userProfilePlaceholder.innerHTML = userProfileTemplate(json);
                var userProfileSource = document.getElementById('user-name-template').innerHTML,
                    userProfileTemplate = Handlebars.compile(userProfileSource),
                    userProfilePlaceholder = document.getElementById('user-name');
                userProfilePlaceholder.innerHTML = userProfileTemplate(json);
            });
            $('#login').hide();
            $('#login-button').hide();
            $('#landing-text').hide();
            $('#title-brand').hide();
            $('#logout-button').show();
            $('#recently-played').show();
            $('#loggedin').show();
            $('#user-name').show();
        });
    },

    fetchNewReleases: function (access_token) {
        fetch('https://api.spotify.com/v1/browse/new-releases', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
            }
        }).then(response => {
            response.json().then(json => {
                this.renderTemplate('new-releases-template', 'new-releases-container', json.albums);
            });
        });
    },

    fetchFeaturedPlaylists: function (access_token) {
        fetch('https://api.spotify.com/v1/browse/featured-playlists', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
            }
        }).then(response => {
            response.json().then(json => {
                this.renderTemplate('featured-playlists-template', 'featured-playlists-container', json.playlists);
            });
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

    renderTemplate: function (templateName, templateContainer, json) {
        var templateSource = document.getElementById(templateName).innerHTML,
            template = Handlebars.compile(templateSource),
            placeholder = document.getElementById(templateContainer);
        placeholder.innerHTML = template(json);
    }
}