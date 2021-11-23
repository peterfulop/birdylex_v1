const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

dotenv.config();

const auth = require("./server/routes/auth");
const pages = require("./server/routes/pages");
const globalRoutes = require("./server/routes/global");

const main = require("./server/routes/birdy");
const user = require("./server/routes/user");
const noteRoutes = require("./server/routes/notes");
const practiceRoutes = require("./server/routes/practice");
const dictionaryRoutes = require("./server/routes/dictionaries");
const wordRoutes = require("./server/routes/words");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

const publicDirectory = path.join(__dirname, "/public");
app.use(express.static(publicDirectory));
app.set("view engine", "hbs");

app.use("/", pages);
app.use("/api", globalRoutes);
app.use("/api/auth", auth);
app.use("/api/users", user);
app.use("/api/words", wordRoutes);
app.use("/api/practice", practiceRoutes);
app.use("/api/dictionaries", dictionaryRoutes);
app.use("/api/notes", noteRoutes);

app.use(main);

// //The 404 Route (ALWAYS Keep this as the last route)
// app.get('*', function (req, res) {
//     res.status(404).render('404');
// });

module.exports = app;
