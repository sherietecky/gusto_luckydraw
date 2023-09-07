const express = require('express');
const path = require('path');

let app = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname + "..", "public")));

app.get('/home', (req: any, res: any) => {
    //res.send('Hello world!');
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export {};