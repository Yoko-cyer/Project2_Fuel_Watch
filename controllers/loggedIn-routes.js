const router = require('express').Router();
const sequelize = require('../config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const axios = require('axios');
const {XMLParser} = require('fast-xml-parser');
const { User } = require('../models');

router.get('/loggedIn', async(req, res) => {

    const sbrb = req.session.suburb;
    let sndsbrb = req.session.surrounding_suburbs;
    const product = req.session.fuel_type
    const request = 'https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Product=' + product + '&Suburb=' + sbrb + '&Surrounding=' + sndsbrb;
    console.log(request);
    await axios.get(request)
    .then((response) => {
      const parser = new XMLParser();
      const json = parser.parse(response.data);
      const station = [];

      if(json.rss.channel.item == undefined) {
        station[0] = "No fuel stations in this area";
        res.render('loggedIn', {fuelData: station});
        return;
      }
      else if(json.rss.channel.item.length == undefined) {
        station[0] = {
          title: json.rss.channel.item.title,
          location: json.rss.channel.item.address + ' ' + json.rss.channel.item.location,
        }
      }
      for(let i = 0; i < json.rss.channel.item.length; i++) {
        station[i] = {
          title: json.rss.channel.item[i].title,
          location: json.rss.channel.item[i].address + ' ' + json.rss.channel.item[i].location,
        }
      }
      if(station.length > 5) {
        station.length = 5;
      }
      console.log(station);
      res.render('loggedIn', {fuelData: station});
    })
  });

module.exports = router;
