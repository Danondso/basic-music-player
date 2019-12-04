import * as express from 'express';
import AuthenticationController from './authentication.controller';

export default express
  .Router()
  .get('/', AuthenticationController.root)
  .get('/login', AuthenticationController.login)
  .get('/callback', AuthenticationController.callback)
  .get('/refresh_token', AuthenticationController.refreshToken)
  .get('/logout', AuthenticationController.logout);
