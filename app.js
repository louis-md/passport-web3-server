require('dotenv').config();
require('./configs/passport');

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');
const session      = require('express-session');
const passport     = require('passport');
const MongoStore   = require('connect-mongo')(session);
const flash        = require("connect-flash");
const axios        = require('axios').default;

mongoose
  .connect('mongodb://localhost/passport-web3', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
});

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// ADD SESSION SETTINGS HERE:
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}));
app.use(flash());
require('./passport')(app);


// USE passport.initialize() and passport.session() HERE:
app.use(passport.initialize());
app.use(passport.session());

// default value for title local
app.locals.title = 'Passport Web3';


// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URI
}));


// ROUTES MIDDLEWARE STARTS HERE:
app.use('/api/organizations', require('./routes/organization-routes'));
app.use('/api/contacts', require('./routes/contact-routes'));
app.use('/api/files', require('./routes/file-routes'));
app.use('/api/graph', require('./routes/graph-routes'));
app.use('/api', require('./routes/auth-routes'));
app.use('/', require('./routes/index'));


module.exports = app;
