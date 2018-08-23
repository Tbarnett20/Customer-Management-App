let express = require('express');
let bodyParser = require('body-parser');
let path = require('path')

let app = express();
/*
let logger = function(req, res, next) {
  console.log('Logging...');
  next();
}

app.use(logger);

*/

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({exyended: false}))

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.get('/', function (req, res) {
  res.send('Hello');
});

app.listen(3000, function () {
  console.log('Server Started on Port 3000..')
})