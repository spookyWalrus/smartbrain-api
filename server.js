const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
require("dotenv").config();

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const app = express();
app.use(bodyParser.json());
app.use(cors());
//   cors({
//     origin: "https://nimble-shortbread-540549.netlify.app",
//     methods: "POST,OPTIONS",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: ["Content-Type"],
//     // credentials: true,
//   })
// );

//  credentials
const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    host: process.env.HOSTNAME,
    port: 5432,
    user: process.env.USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    ssl: { rejectUnauthorized: false },
  },
});

app.get("/", (req, res) => {
  // res.send(dataBase.users);
  db.select("*")
    .from("users")
    .then((data) => {
      res.json(users);
    });
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("app is running on database below");
  console.log("connected to the database: ", process.env.DATABASE);
  console.log(process.env.PORT);
});
