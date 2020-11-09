const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist/angular-code-validator')));

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  console.log(path.join(__dirname, 'dist/angular-code-validator/index.html'));
  res.sendFile(path.join(__dirname, 'dist/angular-code-validator/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);


server.listen(port, () => {
  console.log(`Running on localhost:${port}`)
});
