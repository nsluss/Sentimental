//var Bookshelf = require('bookshelf');
var knex = require('knex').initialize({
  client: 'mysql',
  connection: {
    host     : 'localhost',
    user     : 'dev',
    password : 'password',
    database : 'sentimentalDev',
    charset  : 'utf8'
  }
});

var path = require('path');

//
// var db = Bookshelf.initialize({
//   client: 'mysql',
//   connection: {
//     host: '127.0.0.1',
//     user: 'root',
//     password: '',
//     database: 'sentimentaldb',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/shortly.mysql')
//   }
// });


var db = require('bookshelf')(knex);

// var User = bookshelf.Model.extend({
//   tableName: 'users'
// });

db.knex.schema.hasTable('keywords').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('keywords', function (key) {
      key.increments('id').primary();
      key.string('word', 255);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('sources').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('source', function (source) {
      source.increments('id').primary();
      source.string('name', 225)
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

/************************************************************/
// Add additional schema definitions below
/************************************************************/

db.knex.schema.hasTable('articles').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('articles', function (article) {
      article.increments('id').primary();
      article.integer('source').unsigned().references('id').inTable('sources');
      article.integer('word').unsigned().references('id').inTable('keywords');
      article.date('published');
      article.string('url', 225);
      article.float('sentiment');
      article.timestamps();

    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('keywordSources').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('keywordSources', function (wordSource) {
      wordSource.integer('source').unsigned().references('id').inTable('sources');
      wordSource.integer('words').unsigned().references('id').inTable('words');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;