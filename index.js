'use strict';

const Hapi            = require('hapi');
const resource        = require('hapi-resource-z')
const server          = new Hapi.Server();

const productCategoryController          = require('./controller/productCategory')
const preResponse = function (request, reply) {

    const response = request.response;
    if (response.isBoom) {
        return reply(response.output);
    }

    return reply.continue();
};


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
server.ext('onPreResponse', preResponse);
