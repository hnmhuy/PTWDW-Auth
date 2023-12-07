const express = require("express");
const app = express();
const port = 4000;
const expressHbs = require("express-handlebars");

const cookieParser = require("cookie-parser");
const session = require("express-session");

// Thiet lap thu muc Static
app.use(express.static(__dirname + "/html"));

// Cau hinh Template Engine
app.engine(
  "hbs",
  expressHbs.engine({
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "layout",
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
  })
);
app.set("view engine", "hbs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser("bunngu"));
app.use(
  session({
    secret: "bimat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: true, // prevent client side JS from reading the cookie
      maxAge: 20 * 60 * 1000
    }
  })
)


// Cau hinh cho phep doc du lieu gui len bang phuong thuc POST
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Chuyen huong route xu ly
app.use("/", require("./routes/authRouter"));

// Start web server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
