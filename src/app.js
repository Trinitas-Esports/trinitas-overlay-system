require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/overlay.html"));
});

app.get("/env", (req, res) => {
    res.json({
        gapi: process.env.GAPIKEY,
        sid: process.env.SPREADSHEETID
    });
});

app.listen(3000, () => {
    console.log("App listening on port: 3000");
});