require('dotenv').config();

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
// Définir le dossier des vues (views)
app.set('views', __dirname + '/views');

const path = require('path');
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

const { routerLieux } = require("./routes/routerLieux.js");
app.use(routerLieux);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port`);
});