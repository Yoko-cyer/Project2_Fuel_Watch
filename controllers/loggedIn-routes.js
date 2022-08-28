const router = require('express').Router();
const sequelize = require('../config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const axios = require('axios');
const {XMLParser} = require('fast-xml-parser');
const { User } = require('../models');

router.get('/loggedIn', (req, res) => {

    const sbrb = req.session.suburb;
    let sndsbrb = req.session.surrounding_suburbs;
    const product = req.session.fuel_type

      console.log(product);
    axios.get('https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Product=' + product + '&Suburb=' + sbrb + '&Surrounding=' + sndsbrb)
    .then((response) => {
      const parser = new XMLParser();
      const json = parser.parse(response.data);
      const title = [];
      const address = [];

      if(json.rss.channel.item == undefined) {
        title[0] = "No fuel stations in this area";
        res.render('loggedIn', {fuelData: title});
        return;
      }
      else if(json.rss.channel.item.length == undefined) {
        title[0] =json.rss.channel.item.title; 
        address[0] =json.rss.channel.item.address + ' ' + json.rss.channel.item.location;
      }
      for(let i = 0; i < json.rss.channel.item.length; i++) {
        title[i] = json.rss.channel.item[i].title;
        address[i] = json.rss.channel.item[i].address + ' ' + json.rss.channel.item[i].location;
      }
      if(title.length > 5) {
        title.length = 5;
        address.length = 5;
      }
      console.log(title);
      console.log(address);
      res.render('loggedIn', {fuelData: title});
    })
  });

module.exports = router;
