// Dependencies
const errors = require('restify-errors');
const restify = require('restify-plugins');
const mongoose = require('mongoose');
const randomstring = require('randomstring');
const qs = require('qs');

module.exports = function(server) {

  server.get('/articles/:index', (req, res, next) => {
    data = '<p>HI</p>';
    res.send(200, data);
    next();
  });

};
