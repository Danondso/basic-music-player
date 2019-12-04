import * as express from 'express';
import AlbumController from './album.controller';

export default express
  .Router()
  .get('/album/:id', AlbumController.album);
