// Dependencies
const errors = require('restify-errors');
const restify = require('restify').plugins;
const mongoose = require('mongoose');
const randomstring = require('randomstring');
const qs = require('qs');
const showdown = require('showdown');

const Article = require('../models/article.js');

const Converter = new showdown.Converter();
Converter.setFlavor('github');

module.exports = function(server) {

  // POST
  server.post('/articles/create', (req, res, next) => {

    if(!req.is('application/json')){
      return next(
        new errors.InvalidContentError("Expects 'application/json'")
      );
    }

    let data = req.body || {};

    let article = new Article(data);
    article.save(function(err){
      if(err){
        console.error(err);
        return next(new errors.InternalError(err.message));
        next();
      }

      console.log("Successful application POST from  " + req.connection.remoteAddress + ".");
      res.send(201, article);
      next();

    });

  });

  server.get('/articles/:index', (req, res, next) => {

    Article.findOne({ index: req.params.index }, function(err, doc) {

      if(err) {
        console.error(err);
        return next(
          new errors.InvalidContentError(err.errors.name.message)
        );
      }

      if(doc != null){

        console.log("Successful article GET from  " + req.connection.remoteAddress + ". | Index: " + doc.index);

        htmlcontent = Converter.makeHtml(doc.mdcontent);

        res.send(200, htmlcontent);
        next();

      } else {

        console.log("Successful article GET from  " + req.connection.remoteAddress + ". | NO DATA");

        res.send(204);
        next();

      }

    });

  });

  // PUT
  server.put('/articles/:index', (req, res, next) => {

    let data = req.body || {};

    Article.findOneAndUpdate({ index: req.params.index }, { $set: data }, function(err, doc) {

      if(!req.is('application/json')){
        return next(
          new errors.InvalidContentError("Expects 'application/json'")
        );
      }

      console.log("Successful application PUT from  " + req.connection.remoteAddress + ".");
      res.send(201, doc);
      next();

    });

  });

};
