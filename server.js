const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const hbs = exphbs.create({});
const routes = require('./controllers');
const sequelize = require('./config/connection');
const axios = require('axios');
const {XMLParser} = require('fast-xml-parser');
// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/api/landing-routes'));
app.use(require('./controllers/api/loggedIn-routes'));



  //app.get('/loggedIn', (req, res) => {
    
  //    res.render('loggedIn', {fuelData: title});
  //});

app.get('/api/fuel', (req, res) => {


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
      res.render(title[0] + address[0])
      console.log(title);
      console.log(address);
    })
})

app.use(routes);

// Starts the server to begin listening
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Server listening on: http://localhost:' + PORT));
});
