const newsRouter = require("./news");
const meRouter = require("./me");
const coursesRouter = require("./courses");
const siteRouter = require("./site");
const userRouter = require("./user");
const paymentRouter = require("./payment");
const dgRouter = require("./dg")
const cartsRouter = require("./cart")
const checkoutRouter = require("./checkout")
const auth = require("../app/midleware/auth")
function route(app) {
  app.use("/users", userRouter);
  app.use("/carts", cartsRouter);
  app.use("/me", meRouter);
  app.use("/courses",coursesRouter);
  app.use("/payment",auth.notLogin,paymentRouter);
  app.use('/dg',auth.notLogin,dgRouter);
  app.use("/news", newsRouter);
  app.use("/", siteRouter);
  app.use("/checkout", checkoutRouter)
 
}

module.exports = route;
