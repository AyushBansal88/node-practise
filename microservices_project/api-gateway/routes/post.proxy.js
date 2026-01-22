const proxy = require("express-http-proxy");
const auth = require("../middleware/auth.middleware");

module.exports = (app) => {
  app.use("/posts",auth,proxy(process.env.POST_SERVICE_URL, {
      proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        proxyReqOpts.headers["x-user-id"] = srcReq.user.id;
        return proxyReqOpts;
      },
    }),
  );
};
