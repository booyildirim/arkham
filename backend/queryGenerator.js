
function generateDensityQuery (il, ilce, percent) {
  var filters = [];
  if (il) {
    var ilObj = {
      match: {
        il: il
      }
    }
    filters.push(ilObj);
  }
  if (ilce) {
    var ilceObj = {
      match: {
        ilce: ilce
      }
    }
    filters.push(ilceObj);
  }

  if (percent) {
    var capacityObj = {
      range: {
        load: {
          "gte": percent
        }
      }
    };

    filters.push(capacityObj);
  }

  var stringsQuery = {"query": {"bool": {"must": filters}}};
  console.log(stringsQuery);
  return stringsQuery;
}

function fieldFilter(text, field) {
    return { "match": { field:  text }};
}

function rangeFilter(num, field, operation) { // operation: eq, gte, lte
    return { "range": {field: {operation: num}}};
}

module.exports = {
  "generateDensityQuery": generateDensityQuery
};


// {
//   "query": {
//     "bool": {
//       "must": [
//         { "match": { "il":  "İSTANBUL" }},
//         { "match": { "ilce": "SARIYER"   }},
//         { "range": {"capacity": {"gte": 5}}},
//         { "range": {"customerCount": {"gte": 18}}}
//       ]
//     }
//   }
// }
