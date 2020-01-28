import 'babel-polyfill';
import chai from 'chai';
import SpotifyApiWrapper from '../server/core/api/spotify-api.js';
import sinon from 'sinon';
import fetch from 'node-fetch';

describe('app.controller', () => {

    afterEach(() => {
        sinon.restore();
    })
    it('should fetch top artists', () => {
        const stub = sinon.stub(fetch, 'Promise').returns(Promise.resolve({
            json: () => {
                return {
                    items: []
                };
            }
        }));

        const result = SpotifyApiWrapper.fetchTopArtists('access_token');
        chai.expect(stub.calledOnce).to.be.true;
    });

    it('should fetch recently played songs', () => {
        const stub = sinon.stub(fetch, 'Promise').returns(Promise.resolve({
            json: () => {
                return {
                    items: []
                };
            }
        }));

        const result = SpotifyApiWrapper.fetchRecentlyPlayed('access_token');
        chai.expect(stub.calledOnce).to.be.true;
    });

    it('should fetch new releases', () => {
        const payload = require('../test/payloads/new.releases.0.json');
        const stub = sinon.stub(fetch, 'Promise').returns({
            json: () => {
                return payload;
            }
        });

        const result = SpotifyApiWrapper.fetchNewReleases('access_token');
        result.then(r => {
            chai.expect(stub.calledOnce).to.be.true;
            chai.expect(JSON.stringify(r)).to.eql(JSON.stringify(payload.albums.items));
        });
    });

    it('should fetch featured playlists', () => {
        const stub = sinon.stub(fetch, 'Promise').returns(Promise.resolve({
            json: () => {
                return {
                    items: []
                };
            }
        }));

        const result = SpotifyApiWrapper.fetchFeaturedPlaylists('access_token');
        chai.expect(stub.calledOnce).to.be.true;
    });

    it('should fetch user profile', () => {
        const payload = require('../test/payloads/user.profile.0.json');
        const stub = sinon.stub(fetch, 'Promise').returns(Promise.resolve({
            json: () => {
                return payload;
            }
        }));

        const result = SpotifyApiWrapper.fetchUserProfile('access_token');
        result.then(r => {
            chai.expect(stub.calledOnce).to.be.true;
            chai.expect(JSON.stringify(r)).to.eql(JSON.stringify(payload));
        });
    });
});