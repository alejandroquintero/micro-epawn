// app.js

var session = require('express-session');
var express = require('express');
const app = express();
var path = require('path');
//session-related stuff
var sess = {
 secret: 'diEEBYkhdThkqsEGfHlsVltTTLhtB8naT3cPnj-78fxgKG5qdm-lJzPVP61rtXGv',
 cookie: {},
 resave: false,
 saveUninitialized: true
};

if (app.get('env') === 'production') {
 sess.cookie.secure = true; // serve secure cookies, requires https
}

app.use(session(sess));

// app.js
var Auth0Strategy = require('passport-auth0'),
    passport = require('passport');

//passport-auth0
var strategy = new Auth0Strategy({
  domain: 'bicico.auth0.com',
  clientID: 'OeppbGwOxupCZw1PR73H5eaW4cAWfTNx',
  clientSecret: 'diEEBYkhdThkqsEGfHlsVltTTLhtB8naT3cPnj-78fxgKG5qdm-lJzPVP61rtXGv', // Replace this with the client secret for your app
  callbackURL: 'https://epawn-middleware.herokuapp.com/callback'
 },
 function(accessToken, refreshToken, extraParams, profile, done) {
   // accessToken is the token to call Auth0 API (not needed in the most cases)
   // extraParams.id_token has the JSON Web Token
   // profile has all the information from the user
   return done(null, profile);
 }
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());

//app.js
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// app.js

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

// app.js

// Look up session to know if user is logged in
app.use(function(req, res, next) {
  res.locals.loggedIn = false;
  if (req.session.passport && typeof req.session.passport.user !== 'undefined') {
    res.locals.loggedIn = true;
  }
  next();
});

// the auth router should be loaded after the function definition
app.use('/', indexRouter);
//..
app.use('/', authRouter);
//..
module.exports = app;
