const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require("path");
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');

dotenv.config();

const auth = require('./API/routes/auth');
const pages = require("./API/routes/pages")
const globalRoutes = require('./API/routes/global');

const main = require('./API/routes/birdy');
const user = require('./API/routes/user');
const noteRoutes = require('./API/routes/notes');
const practiceRoutes = require('./API/routes/practice');
const dictionaryRoutes = require('./API/routes/dictionaries');
const wordRoutes = require('./API/routes/words');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

const publicDirectory = path.join(__dirname, "/public")
app.use(express.static(publicDirectory));
app.set("view engine", "hbs");


app.use("/", pages);
app.use("/api", globalRoutes);
app.use("/api/auth", auth);
app.use("/api/users", user);
app.use("/api/words", wordRoutes);
app.use('/api/practice', practiceRoutes);
app.use('/api/dictionaries', dictionaryRoutes);
app.use('/api/notes', noteRoutes);


app.use(main);


// The 404 Route (ALWAYS Keep this as the last route)
// app.get('*', function (req, res) {
//     res.status(404).render('404');
// });


module.exports = app;