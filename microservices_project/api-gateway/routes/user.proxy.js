const proxy = require('express-http-proxy');

module.exports = (app) => {
  app.use('/user', proxy(process.env.USER_SERVICE_URL,{
      proxyReqPathResolver: (req) => `/users${req.url}`
    }
  ))
}