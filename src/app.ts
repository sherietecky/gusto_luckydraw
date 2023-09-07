//import express from 'express';
const express = require('express');

let app = express();

//const app: Application = express();
const PORT: string | number = process.env.PORT || 3000;

app.get('/', (req: any, res: any) => {
    res.send('Hello world!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export {};