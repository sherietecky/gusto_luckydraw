"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import express from 'express';
var express = require('express');
var app = express();
//const app: Application = express();
var PORT = process.env.PORT || 3000;
app.get('/', function (req, res) {
    res.send('Hello world!');
});
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
