// Dependencies
const errors = require('restify-errors');
const restify = require('restify-plugins');
const mongoose = require('mongoose');
const randomstring = require('randomstring');
const qs = require('qs');

module.exports = function(server) {

  server.get('/', (req, res, next) => {
    res.redirect('https://api.samusoidal.com:7002/app/', next);
  });

};
