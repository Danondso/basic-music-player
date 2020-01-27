import 'babel-polyfill';
import chai from 'chai';
import mocha from 'mocha';
import Response from 'node-fetch';
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
        const stub = sinon.stub(fetch, 'Promise').returns(Promise.resolve({
            json: () => {
                return {
                    items: []
                };
            }
        }));

        const result = SpotifyApiWrapper.fetchNewReleases('access_token');
        chai.expect(stub.calledOnce).to.be.true;
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
        const stub = sinon.stub(fetch, 'Promise').returns(Promise.resolve({
            json: () => {
                return {
                    items: []
                };
            }
        }));

        const result = SpotifyApiWrapper.fetchUserProfile('access_token');
        chai.expect(stub.calledOnce).to.be.true;
    });
});