import * as express from 'express';
import SearchController from './search.controller';

export default express
  .Router()
  .get('/search', SearchController.search);