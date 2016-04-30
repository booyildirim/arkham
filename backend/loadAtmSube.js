var fs = require('fs');
//
// var atm = JSON.parse(fs.readFileSync('atm.json', 'utf8'));
var sube = JSON.parse(fs.readFileSync('sube.json', 'utf8'));
//
//
var Client = require('node-rest-client').Client;
var client = new Client();
//
// // var atmCount = Object.keys(atm.ATMS.ATM).length;
// //
// // function loadAtms(i) {
// //   if (i>=atmCount) {
// //     return;
// //   }
// //   var args = {
// //     data: atm.ATMS.ATM[i],
// //     headers: { "Content-Type": "application/json" }
// //   };
// //
// //   var url = 'http://localhost:9200/atms/atm/' + (i+1);
// //   client.post(url, args, function (data, response) {
// //       console.log("done with atm " + (i+1));
// //       loadAtms(++i)
// //   });
// //
// // }
// //
// // loadAtms(0);
// //
var subeCount = Object.keys(sube.Branches.Branch).length;
function loadBranches(i) {
  if (i>=subeCount) {
    return;
  }

  var capacity = random(2, 15) | 0;
  var humans = random(0, capacity * 4) | 0;

  var data = sube.Branches.Branch[i];
  data["capacity"] = capacity;
  data["customerCount"] = humans;
  if (humans > capacity) {
    data["load"] = 100
  }
  else {
      data["load"] = ((humans/capacity) * 100) | 0;
  }


  var args = {
    data: data,
    headers: { "Content-Type": "application/json" }
  };

  var url = 'http://localhost:9200/branches/branch/' + (i+1);
  client.post(url, args, function (data, response) {
      console.log("done with branch " + (i+1));
      loadBranches(++i)
  });
}

loadBranches(0);
//
function random (low, high) {
    return Math.random() * (high - low) + low;
}


var users = []
users.push(alpercem)

var alpercem = {
  "id": 1,
  "age": 24,
  "gender": "E",
  "type": "bireysel",
  "islemler": [{"type": "nakit", "count": 4, "avarage": 12.0}],
  "active": false,
  "lastSeen": 1461947475243
}



// // var subeCount = Object.keys(sube.Branches.Branch).length;
// // function loadCapaityAndCrowd(i) {
// //   if (i>=subeCount) {
// //     return;
// //   }
// //
// //   var idx = i+1;
// //
// //
// //   var data = {
// //     "branchId": idx,
// //     "capacity": capacity,
// //     "customerCount": humans
// //   }
// //
// //   var args = {
// //     data: data,
// //     headers: { "Content-Type": "application/json" }
// //   };
// //
// //   var url = 'http://localhost:9200/branches/density/' + (i+1);
// //   client.post(url, args, function (data, response) {
// //       console.log("done with density " + (i+1));
// //       loadCapaityAndCrowd(++i)
// //   });
// // }
// //
// // loadCapaityAndCrowd(0);

// var url = 'http://localhost:9200/branches/branch/_search?size=2000';
// var data = {"query": {"bool": {"should": [{ "match": { "il":  "İSTANBUL" }},{ "match": { "ilce": "SARIYER"}}]}}};
// var args = {
//   data: data,
//   headers: { "Content-Type": "application/json" }
// };
//
// client.post(url, args, function (response) {
//   console.log(response);
// });
