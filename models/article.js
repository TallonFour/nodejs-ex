const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const ArticleSchema = new mongoose.Schema(
  {
    index: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    mdcontent: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: false,
    },
    authoremail: {
      type: String,
      required: false,
    }
  },
  { minimize: false }
);

ArticleSchema.plugin(timestamps);
ArticleSchema.plugin(mongooseStringQuery);
ArticleSchema.plugin(autoIncrement.plugin, {
  model: 'Article',
  field: 'index',
  startAt: 1000,
  incrementBy: 1
});

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;
