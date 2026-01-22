const proxy = require('express-http-proxy');
const auth = require('../middleware/auth.middleware');

module.exports = (app) => {
  app.use('/user', proxy(process.env.USER_SERVICE_URL))
}

module.exports = (app) => {
  app.use('/user/dashboard', auth, proxy(process.env.USER_SERVICE_URL,{
    proxyReqPathResolver: (req) => `${req.url}dashboard`,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers['x-user-id'] = srcReq.user.id;
      proxyReqOpts.headers['x-user-role'] = srcReq.user.role;
      return proxyReqOpts;
    }
  }))
}