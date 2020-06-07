import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import exphbs from 'express-handlebars';
import authenticationRouter from './features/authentication/authentication.router';
import albumRouter from './features/album/album.router';
import appRouter from './app.router';
import artistRouter from './features/artist/artist.router';
import searchRouter from './features/search/search.router';

var app = express();

app.use(express.static('src/public'))
  .use(cors())
  .use(cookieParser());

var hbs = exphbs.create({
  /* config */
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(appRouter);
app.use(authenticationRouter);
app.use(artistRouter);
app.use(albumRouter);
app.use(searchRouter)

console.log('Listening on 8888');
app.listen(8888);