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
                var topArtistsSource = document.getElementById('top-artists-template').innerHTML,
                topArtistsTemplate = Handlebars.compile(topArtistsSource),
                topArtistsPlaceholder = document.getElementById('top-artists-container');
                topArtistsPlaceholder.innerHTML = topArtistsTemplate(json);
            });
        });
    },

    fetchRecentlyPlayed: function (access_token) {
        // Kick off getting the recently played tracks
        fetch('https://api.spotify.com/v1/me/player/recently-played', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
            }
        }).then(response => {
            response.json().then(json => {
                var recentlyPlayedSource = document.getElementById('recently-played-template').innerHTML,
                recentlyPlayedTemplate = Handlebars.compile(recentlyPlayedSource),
                recentlyPlayedPlaceholder = document.getElementById('recently-played-container');
                recentlyPlayedPlaceholder.innerHTML = recentlyPlayedTemplate(json);
            });
        });
    },

    fetchUserProfile: function (access_token) {
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
    }


        // //TODO have this refresh the token on failure, should that live in the back-end?
        // document.getElementById('obtain-new-token').addEventListener('click', function () {
        //   $.ajax({̀
        //     url: '/refresh_token',
        //     data: {
        //       'refresh_token': refresh_token
        //     }
        //   }).done(function (data) {
        //     access_token = data.access_token;
        //     console.log(access_token);
        //   });
        // }, false);
}