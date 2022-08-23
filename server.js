const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const hbs = exphbs.create({});
const routes = require('./controllers');
const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.store);
const axios = require('axios');
const {XMLParser} = require('fast-xml-parser');
// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/landing-routes'));
app.use(require('./controllers/loggedIn-routes'));



app.get('/api/fuel', (req, res) => {


  axios.get('https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Suburb=Karawara')
    .then((response) => {
      const parser = new XMLParser();
      const json = parser.parse(response.data);
      const price = json.rss.channel.item[0].price;
      res.json(price);
      console.log(price);
      fuelOne.innerHTML = price;
    })

})


// Starts the server to begin listening
app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});
