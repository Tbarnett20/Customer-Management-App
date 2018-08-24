let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let expressValidator = require('express-validator');
let mongojs = require('mongojs');
let db = mongojs('customerapp', ['users'])
let ObjectId = mongojs.ObjectID;
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

// Global
app.use(function (req, res, next) {
  res.locals.errors = null;
  next();
})

// Express Validator Middleware
app.use(expressValidator());

// Express Validator Middleware
// app.use(expressValidator({
//   errorFormatter: function(param, msg, value) {
//       var namespace = param.split('.')
//       , root    = namespace.shift()
//       , formParam = root;

//     while(namespace.length) {
//       formParam += '[' + namespace.shift() + ']';
//     }
//     return {
//       param : formParam,
//       msg   : msg,
//       value : value
//     };
//   },
//    customValidators: {
//     isPsd1EqPsd2: function(psd1,psd2) {
//         console.log(psd1===psd2);
//         return psd1===psd2;
//     }
//  }
// }));

// Routes
app.get('/', function (req, res) {
  db.users.find(function (err, docs) {
    res.render('index', {
      title: 'Customers',
      users: docs
    });
  })
});

app.post('/users/add', function (req, res){
  req.checkBody('first_name','First Name is Required').notEmpty(); 
  req.checkBody('last_name','Last Name is Required').notEmpty(); 
  req.checkBody('email','Email is Required').notEmpty(); 
  
  let errors = req.validationErrors();

  if (errors) {
    res.render('index', {
      title: 'Customers',
      users: users,
      errors: errors
    });
  } else {
    let newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    }
    db.users.insert(newUser, function(err, result){
      if(err){
        console.log(err)
      }
      res.redirect('/')
    });
  }
});
app.delete('/users/delete/:id', function(req, res) {
  db.users.remove({_id: ObjectId(req.params.id)}, function(err, result){
    if (err) {
      console.log(err)
    }
    res.redirect('/')
  })
});

app.listen(3000, function () {
  console.log('Server Started on Port 3000..')
})