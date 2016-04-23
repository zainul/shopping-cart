const _ = require('lodash');
const query = {}

query.sort = (options) => {
  var properties, sort = null;

  if (options) {
    properties = options.split(',');

    if (properties.length > 1) {
      sort = [
          [properties[0] , properties[1]]
        ]
    }
  }

  return sort;
}

query.where = (options, model) => {
  var buildWhere = {}
  var properties = [];

  // _.forOwn(model.attributes, (value, key) => {
  //   properties.push(key);
  // })

  if (options) {
    _.forOwn(options, (value, key) => {
      // if (key.indexOf(properties) != -1)
        buildWhere[key] = value;
    });
  }

  return buildWhere;
}

query.filter = (options, model) => {
  return {
    where : query.where(options, model),
    order : query.sort(options.sort),
    limit : options.limit || null,
    offset: options.offset || null
   };
}

module.exports = query;
