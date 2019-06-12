'use strict';

const Express = require('express');
const Http = require('http');
const app = Express();
const server = Http.Server(app);

app.use(Express.static(__dirname + '/public'))
server.listen(5000, () => {
    console.log(`App listening on 5000!`);
});