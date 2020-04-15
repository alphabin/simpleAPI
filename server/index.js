const bodyParser = require("body-parser");
const express = require('express');

const app = express();
const myApi = require('./routes');
const port = 3000

//For requests
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(bodyParser.json({ limit: '100mb', extended: true }));

//App routes entry point 
app.use('/', myApi);

//Server
module.exports = app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))