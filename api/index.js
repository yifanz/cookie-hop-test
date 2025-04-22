const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', 'frame-ancestors *');
    res.removeHeader('X-Frame-Options');
    next();
});

app.get('/', (req, res) => {
    res.cookie('abcd', '1234', { sameSite: 'none', secure: true });
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/read', (req, res) => {
    const cookie = req.cookies.abcd || 'notfound';
    console.log(cookie);
    res.send(cookie);
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;