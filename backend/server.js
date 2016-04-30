var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var port = 8080;

var Client = require('node-rest-client').Client;
var client = new Client();

var queryGenerator = require('./queryGenerator');


// to get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// mw routes
var api = express.Router();


api.get("/health", function(req, res) {
    var resp = {
      success: true,
      message: "I am healty."
    }
    res.json(resp);
});


api.post('/data', function(req, res) {
    var dataToPost = req.body.data;
    var token = req.body.token;

    var resp = {
      success: true,
      message: "Done.",
      data: dataToPost
    }

    res.json(resp);
});

api.post('/density', function (req, res) {
  var il = req.body.il;
  var ilce = req.body.ilce;
  var percent = req.body.percent;
  // var custCount = req.body.customerCount; // gte
  // var capacity = req.body.capacity; // gte

  var req = queryGenerator.generateDensityQuery(il, ilce, percent);
  var url = 'http://localhost:9200/branches/branch/_search?size=2000';
  var args = {
    data: req,
    headers: { "Content-Type": "application/json" }
  };

  client.post(url, args, function (response) {
    res.json(response);
  });

});

api.post('/event', function (req, res) {
  var active = req.body.status;
  var timeSeen = req.body.time;
  var userId = req.body.deviceId;
  var branchId = req.body.branchId;

  // find branch

  var url = 'http://localhost:9200/branches/branch/' + branchId;
  var args = {
    headers: { "Content-Type": "application/json" }
  };

  client.get(url, args, function (response) {

    // find customer
    var customerFound = response._source.customers[0];
    if (!active && customerFound.active) {
      customerFound.islemler[0].count +=1;
    }
    customerFound.active = active;

    if (active) {
      response._source.customerCount +=1;
    } else {
      response._source.customerCount -=1;
    }

    if (response._source.customerCount < 0) {
      response._source.customerCount = 0;
    }

    var capacity = response._source.capacity;
    var newCount = response._source.customerCount;
    if (newCount > capacity) {
      response._source.load = 100
    }
    else {
        response._source.load = ((newCount/capacity) * 100) | 0;
    }

    // update the branch and its objects
    response._source.customers[0] = customerFound;
    var args = {
      data: response._source,
      headers: { "Content-Type": "application/json" }
    };

    client.put(url, args, function (response2) {
        res.json(response2);
    });


  });

});


// all mw routes under /api/*
app.use('/api', api);

// Start the server
app.listen(port);
console.log('Server started @' + port);
