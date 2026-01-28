const proxy = require("express-http-proxy");
const auth = require("../middleware/auth.middleware");

module.exports = (app) => {

  const postProxy = proxy(process.env.POST_SERVICE_URL, {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      if (srcReq.user) {
        proxyReqOpts.headers["x-user-id"] = srcReq.user.id;
        proxyReqOpts.headers["x-user-role"] = srcReq.user.role;
      }
      return proxyReqOpts;
    },
  });

  app.post("/post", auth, postProxy);
  app.put("/post/:postId", auth, postProxy);
  app.delete("/post/:postId", auth, postProxy);
  app.post("/post/:postId/like", auth, postProxy);
  app.post("/post/:postId/comment", auth, postProxy);

  app.get("/post", postProxy);
  app.get("/post/:postId", postProxy);
};
