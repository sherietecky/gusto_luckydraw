"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname + "..", "public")));
app.get('/home', function (req, res) {
    //res.send('Hello world!');
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
