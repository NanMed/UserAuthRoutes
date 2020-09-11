let express = require('express'); 
let app = express();
let webRoutes = require('./routes/web');
let appRoutes = require('./routes/app');
let authMiddleware = require('./validators/AuthMiddleware');

let cookieParser = require('cookie-parser');
let session = require('express-session');
let flash = require('express-flash');
let sessionStore = new session.MemoryStore;
let passport = require('passport');

/**
 * Configurations
 */

let appConfig = require('./configs/app');

// Views engine
let exphbs = require('express-handlebars');
// Imports a set of helpers for handlebars
// https://github.com/helpers/handlebars-helpers
let hbshelpers = require("handlebars-helpers");
let multihelpers = hbshelpers();
const extNameHbs = 'hbs';
let hbs = exphbs.create({
  extname: extNameHbs,
  helpers: multihelpers
});
app.engine(extNameHbs, hbs.engine);
app.set('view engine', extNameHbs);

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
  cookie: { maxAge: 60000 },
  store: sessionStore,
  saveUninitialized: true,
  resave: 'true',
  secret: appConfig.secret
}));
app.use(flash());

// Configuraciones de passport
require('./configs/passport');
app.use(passport.initialize());
app.use(passport.session());

/**
 * Routes
 */
app.use('/', webRoutes);
app.use('/app', authMiddleware.esUsuario, appRoutes);

/**
 * App Init
 */
app.listen(appConfig.expressPort, () => {
  console.log(`Server is listenning on ${appConfig.expressPort}! (http://localhost:${appConfig.expressPort})`);
});
