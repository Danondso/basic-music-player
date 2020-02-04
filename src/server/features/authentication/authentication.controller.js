import '../../core/common/env';
import request from 'request';
import querystring from 'querystring';

const stateKey = 'spotify_auth_state';
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

const AuthenticationController = {
    login: function (req, res) {
        const state = generateRandomString(16);
        res.cookie(stateKey, state);
        // your application requests authorization
        const scope = 'user-read-private user-read-email user-read-recently-played user-top-read';
        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
            }));
    },
    logout: function (req, res) {
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.redirect('/');
    },
    refreshToken: function (req, res) {
        let refresh_token = req.query.refresh_token;
        let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
            },
            form: {
                grant_type: 'refresh_token',
                refresh_token: refresh_token
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                const access_token = body.access_token;
                res.clearCookie('access_token');
                res.cookie('access_token', access_token, {
                    expires: new Date(Date.now() + 8 * 3600000),
                });
                res.cookie('refresh_token', refresh_token, {
                    expires: new Date(Date.now() + 8 * 3600000),
                });
                res.redirect('/home');
            }
        });
    },
    callback: function (req, res) {
        const code = req.query.code || null;
        const state = req.query.state || null;
        const storedState = req.cookies ? req.cookies[stateKey] : null;

        if (state === null || state !== storedState) {
            res.redirect('/#' +
                querystring.stringify({
                    error: 'state_mismatch'
                }));
        } else {
            res.clearCookie(stateKey);
            const authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    code: code,
                    redirect_uri: redirect_uri,
                    grant_type: 'authorization_code'
                },
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
                },
                json: true
            };

            request.post(authOptions, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    let access_token = 'Bearer ' + body.access_token;
                    let refresh_token = body.refresh_token;
                    res.cookie('access_token', access_token, {
                        expires: new Date(Date.now() + 8 * 3600000),
                    });
                    res.cookie('refresh_token', refresh_token, {
                        expires: new Date(Date.now() + 8 * 3600000),
                    });
                    res.redirect('/home');
                } else {
                    res.redirect('/#' +
                        querystring.stringify({
                            error: 'invalid_token'
                        }));
                }
            });
        }
    }
}
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function (length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export default AuthenticationController;