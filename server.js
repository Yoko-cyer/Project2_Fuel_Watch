const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const axios = require('axios');
const {XMLParser} = require('fast-xml-parser');
// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions with cookies
const sess = {
  secret: 'Super secret secret',
  cookie: {
    // Stored in milliseconds (86400 === 1 day)
    maxAge: 86400,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Set Handlebars as the default template engine.
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/api/user-routes'));
app.use(require('./controllers/loggedIn-routes'));


 // app.get('/api/user');
  app.get('/loggedIn', (req, res) => {
    axios.get('https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Suburb=Karawara')
    .then((response) => {
      const parser = new XMLParser();
      const json = parser.parse(response.data);
      const title = [];
      const address = [];
      for(let i = 0; i < 5; i++) {
        title[i] = json.rss.channel.item[i].title;
        address[i] = json.rss.channel.item[i].address + ' ' + json.rss.channel.item[i].location;
      }
      res.render('loggedIn', {fuelData: title});
      console.log(title);
      console.log(address);
    })

  });

app.use(routes);

// Starts the server to begin listening
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Server listening on: http://localhost:' + PORT));
});
