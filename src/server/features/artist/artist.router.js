import * as express from 'express';
import ArtistController from './artist.controller';

export default express
    .Router()
    .get('/artist/:id', ArtistController.renderArtistProfile);