'use strict';

const Hapi            = require('hapi');
const resource        = require('hapi-resource-z')
const server          = new Hapi.Server();

const productCategoryController          = require('./controller/productCategory')

server.connection({ port: 3000 });

server.route(resource({
  name : "product_category",
  controller : productCategoryController
}));

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
