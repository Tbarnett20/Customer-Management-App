let express = require('express');
let bodyParser = require('body-parser');
let path = require('path')

let app = express();

app.listen(3000, function () {
  console.log('Server Started on Port 3000..')
})