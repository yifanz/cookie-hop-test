const express = require("express");
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.cookie('abcd', '1234', { sameSite: 'none', secure: true });
    res.render('index');
});

app.get('/read', (req, res) => {
    const cookie = req.cookies.abcd || 'notfound';
    console.log(cookie);
    res.send(cookie);
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;