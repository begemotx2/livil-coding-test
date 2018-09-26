/* eslint-env node */
'use strict';

module.exports = function(app) {
  const express = require('express'),
        mockInfo = require('./owm-mock.json');
        
  let owmForecastRouter = express.Router();

  owmForecastRouter.get('/', function(req, res) {
    const q = req.query.q || 'all';
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + 1);
    baseDate.setHours(0, 0, 0, 0);

    res.send({
      
      'data': mockInfo.list.map((m, index) => {
        const date = new Date(baseDate.getTime() + index * 1000 * 60 * 60 * 24);
        //baseDate.setDate(baseDate.getDate() + 1);
        return {
          id : q + '/' + date.getTime() / 1000,
          type: 'owm-forecast',
          attributes: {
            date: date,
            high: m.temp.max,
            low: m.temp.min,
            text: m.weather[0].main
          }
        }
      })
    });
  });

  owmForecastRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  owmForecastRouter.get('/:id', function(req, res) {
    res.send({
      'owm-forecast': {}
    });
  });

  owmForecastRouter.put('/:id', function(req, res) {
    res.send({
      'owm-forecast': {
        id: req.params.id
      }
    });
  });

  owmForecastRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/owm-forecast', require('body-parser').json());
  app.use('/api/owm-forecasts', owmForecastRouter);
};
