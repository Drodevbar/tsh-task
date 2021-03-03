const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.use('/api/movie', require('./route/api/movie'));

module.exports = server;
