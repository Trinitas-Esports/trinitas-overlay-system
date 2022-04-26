const path = require('path');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
else {
    const dotenv = require('dotenv').config({
        path: path.join(__dirname, '../.env')
    });
}

const express = require('express');

const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../plugins')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/overlay.html"));
});

app.get("/env", (req, res) => {
    res.json({
        gapi: process.env.GAPIKEY,
        sid: process.env.SPREADSHEETID
    });
});

app.listen(port, () => {
    console.log("App listening on port: " + port);
});