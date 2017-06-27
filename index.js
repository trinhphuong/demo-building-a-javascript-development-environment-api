var jsf =require('json-schema-faker');
var schema = require('./mockDataSchema');
var fs = require('fs');
var chalk = require('chalk');
var jsonServer = require('json-server');

console.log(schema);

const json = JSON.stringify(jsf(schema));

fs.writeFile("db.json", json, function (err) {
  if (err) {
    return console.log(chalk.red(err));
  } else {
    console.log(chalk.green("Mock data generated."));
    var server = jsonServer.create();
    var router = jsonServer.router('db.json');
    var middlewares = jsonServer.defaults();
    var port = process.env.PORT || 3000;

    server.use(middlewares);
    server.use(router);

    server.listen(port, function () {
        console.log(chalk.green('json-server is running!'));
    });
  }
})