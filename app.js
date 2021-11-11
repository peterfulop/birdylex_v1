const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require("path");
const cookieParser = require("cookie-parser");

dotenv.config();

const auth = require('./API/routes/auth');
const pages = require("./API/routes/pages")
const globalRoutes = require('./API/routes/global');
const userRoutes = require('./API/routes/user');
const notesRoutes = require('./API/routes/notes');
const practiceRoutes = require('./API/routes/practice');
const dictionariesRoutes = require('./API/routes/dictionaries');
const wordsRoutes = require('./API/routes/words');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



//app.use("/client", express.static(path.resolve("../", "client")))

const publicDirectory = path.join(__dirname, "/public")
app.use(express.static(publicDirectory));
app.set("view engine", "hbs");


//Routes which should handle requests
// app.use('/api/', globalRoutes);

// app.use('/', (req, res) => {
//     res.render('register');
// });

app.use("/", pages);
app.use("/api/auth", auth);


// app.use('/api/users', userRoutes);
// app.use('/api/notes', notesRoutes);
// app.use('/api/practice', practiceRoutes);
// app.use('/api/dictionaries', dictionariesRoutes);
// app.use('/api/words', wordsRoutes);

// app.use(home);


//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
    res.status(404).render('404');
});


module.exports = app;