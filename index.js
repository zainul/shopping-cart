'use strict';

const Hapi            = require('hapi');
const resource        = require('hapi-resource-z');
const server          = new Hapi.Server();
const joi             = require('joi');
const inert           = require('inert');
const vision          = require('vision');
const hapiSwagger     = require('hapi-swagger');
const Pack            = require('./package');

const productCategoryController          = require('./controller/productCategory')
const preResponse = function (request, reply) {

    const response = request.response;
    if (response.isBoom) {
        return reply(response.output);
    }

    return reply.continue();
};
const options = {
    info: {
            'title': 'Shopping Cart API Documentation',
            'version': Pack.version,
        }
    };


server.connection({ port: 3000 });

server.route(resource({
  name: "product_category",
  controller: productCategoryController,
  validate: {
    payload: {
      name: joi.string().alphanum().required(),
    }
  }
}));

server.route({
    method: 'GET',
    path: '/',
    config: {
      handler: function (request, reply) {
          reply('Hello, world!');
      },
      description: 'Hello world',
      notes: 'Return Hello world',
      tags: ['api'],
    }
});

server.register([
    inert,
    vision,
    {
        'register': hapiSwagger,
        'options': options
    }], (err) => {

    });


server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

server.ext('onPreResponse', preResponse);
