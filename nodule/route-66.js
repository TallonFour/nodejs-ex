function initializeRoutes(server){
  require('../routes')(server);
  require('../api/article.js')(server);
  require('console-stamp')(console, '[HH:MM:ss.l]')
}

module.exports = {initializeRoutes}
