const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const port = 3000;

const route = require("./routes");
const db = require("./config/db");
const SortMidleware=require("./app/middlewares/sortMidleware");

//connect db
db.connect();
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("combined"));

app.use(methodOverride("_method"));

app.use(SortMidleware);

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers:require('./helpers/handlebars')
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

app.use(cookieParser());

//route init
app.set("trust proxy", 1);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 1000 * 60 * 60 },
  })
);

//route init
route(app);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
