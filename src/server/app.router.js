import * as express from 'express';
import AppController from './app.controller';

export default express
  .Router()
  .get('/', AppController.root)
  .get('/home', AppController.home);