const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const { extendWith } = require("lodash");

const app = express();

app.set("view engine", "ejs");

const dbURI = "mongodb+srv://bloguser:01020321@tutoriais.7kiyu.gcp.mongodb.net/NodeTuts?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("Database connected...");
        app.listen(3000, () => console.log("Listening to port 3000."))
    })
    .catch((err) => {
        console.err("Connection error", err);
    });

app.use(morgan("dev"));

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.redirect("/blogs");
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});
