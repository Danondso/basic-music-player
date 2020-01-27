import 'babel-polyfill';
import chai from 'chai';
import mocha from 'mocha';
import AppController from '../server/app.controller.js';
import SpotifyApiWrapper from '../server/core/api/spotify-api.js';
import sinon from 'sinon';

describe('app.controller', () => {
    it('should fetch home data', () => {
        const stub = sinon.stub(SpotifyApiWrapper, "fetchHomeData").returns(Promise.resolve());
        const req = { 
            cookies: {
                access_token: 'fake'
            }
        };
        AppController.home(req, {});
        chai.expect(stub.calledOnce).to.be.true;
    });
});