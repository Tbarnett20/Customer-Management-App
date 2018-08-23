let express = require('express');
let bodyParser = require('body-parser');
let path = require('path')

let app = express();
/* let logger = function(req, res, next) {
  console.log('Logging...');
  next();
}
app.use(logger); */

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({exyended: false}))

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')))

let users = [
  { id: 1,
    first_name: 'Terry',
    last_name: 'Barnett',
    email: 'terrance@gmail.com'
  },
  { id: 2,
    first_name: 'Crabby',
    last_name: 'Watts',
    email: 'crabby@gmail.com'
  },
  { id: 3,
    first_name: 'Katie',
    last_name: 'Whats',
    email: 'katie@gmail.com'
  },
]

// Routes
app.get('/', function (req, res) {
  res.render('index', {
    title: 'Customers',
    users: users
  });
});

app.post('/users/add', function (req, res){
  let newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  }
  console.log(newUser)
});

app.listen(3000, function () {
  console.log('Server Started on Port 3000..')
})