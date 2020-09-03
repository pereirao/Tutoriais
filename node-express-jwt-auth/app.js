const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = 3000;

// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbUser = "jwtuser";
const dbPassword = "jwtpassword";
const dbCluster = "tutoriais";
const dbName = "jwt-auth";
const dbURI = `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}.7kiyu.gcp.mongodb.net/${dbName}`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(PORT, (e) => console.log(`Listening on port ${PORT}...`)))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);