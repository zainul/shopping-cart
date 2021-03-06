
'use strict';

const Hapi            = require('hapi');
const resource        = require('hapi-resource-z');
const server          = new Hapi.Server();
const joi             = require('joi');
const inert           = require('inert');
const vision          = require('vision');
const hapiSwagger     = require('hapi-swagger');
const Pack            = require('./package');

const productCategoryController = require('./controller/productCategory');
const productController = require('./controller/product');
const inventoryController = require('./controller/inventory');
const receiveProductController = require('./controller/receiveProduct');
const couponController = require('./controller/coupon');
const discountCouponController = require('./controller/discountCoupon');
const productPerInventoryController = require('./controller/productPerInventory');
const discountPurchaseController = require('./controller/discountTotalPurchase');
const productPerInventoryDetilController = require('./controller/productPerInventoryDetil');
const saleController = require('./controller/sale');
const saleItemController = require('./controller/saleItem');

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
      name: joi.string().required(),
    }
  }
}));

server.route(resource({
  name: "inventory",
  controller: inventoryController,
  validate: {
    payload: {
      name: joi.string().required(),
      address: joi.string(),
      location: joi.string()
    }
  }
}));

server.route(resource({
  name: "product",
  controller: productController,
  validate: {
    payload: {
      name: joi.string().required(),
      ProductCategoryId: joi.number().required(),
    }
  }
}));

server.route(resource({
  name: "receive_product",
  controller: receiveProductController,
  validate: {
    payload: {
      ProductPerInventoryId: joi.number().required(),
      total: joi.number().required(),
      date: joi.date().required(),
      costOfGoodSold: joi.number().required()
    }
  }
}));

server.route(resource({
  name: "coupon",
  controller: couponController,
  validate: {
    payload: {
      totalCreated: joi.number().min(1),
      usedAt: joi.date(),
      usedBy: joi.number(),
      DiscountCouponId: joi.number().required(),
    }
  }
}));

server.route(resource({
  name: "discount_coupon",
  controller: discountCouponController,
  validate: {
    payload: {
      name: joi.string().required(),
      start: joi.date().required(),
      end: joi.date().required(),
      amount: joi.number().required(),
      typeable: joi.string().required(),
      type_id: joi.number().required()
    }
  }
}));

server.route(resource({
  name: "product_per_inventory",
  controller: productPerInventoryController,
  validate: {
    payload: {
      ProductId: joi.number().required(),
      InventoryId: joi.number().required()
    }
  }
}));

server.route(resource({
  name: "discount_purchase",
  controller: discountPurchaseController,
  validate: {
    payload: {
      name: joi.string().required(),
      start: joi.date().required(),
      end: joi.date().required(),
      typeable: joi.string().required(),
      type_id: joi.number().required(),
      discount_value: joi.number().required(),
      type_discount: joi.string().required(),
      min_purchase: joi.number().required()
    }
  }
}));

server.route(resource({
  name: "sale",
  controller: saleController,
  validate: {
    payload: {
      sale_items: joi.array().items(
          joi.object().keys({
          total_item: joi.number().required(),
          ProductPerInventoryDetilId: joi.number()
        })
      )
    }
  }
}));

server.route({
    method: 'GET',
    path: '/sales/{id}/pre_checkout/{code}',
    config: {
      handler: saleController.preCheckout,
      description: 'pre checkout coupon',
      notes: 'pre checkout coupon',
      validate: {
        params: {
          code: joi.string().required(),
          id: joi.number().required()
        }
      },
      tags: ['api'],
    }
});

server.route({
    method: 'PUT',
    path: '/sale_items/{id}',
    config: {
      handler: saleItemController.update,
      description: 'update total item in sale items',
      notes: 'update total item in sale items',
      validate: {
        payload: {
          total_item: joi.number().required()
        }
      },
      tags: ['api'],
    }
});

server.route({
    method: 'POST',
    path: '/sale_items',
    config: {
      handler: saleItemController.create,
      description: 'add new item in sale items',
      notes: 'add new item in sale items',
      validate: {
        payload: {
          SaleId: joi.number().required(),
          total_item: joi.number().required(),
          ProductPerInventoryDetilId: joi.number().required()
        }
      },
      tags: ['api'],
    }
});

server.route({
    method: 'DELETE',
    path: '/sale_items/{id}',
    config: {
      handler: saleItemController.destroy,
      description: 'delete item in sale items',
      notes: 'delete item in sale items',
      tags: ['api'],
    }
});

server.route({
    method: 'GET',
    path: '/product_per_inventory_detils',
    config: {
      handler: productPerInventoryDetilController.index,
      description: 'Get product per inventory detil this route to get list all available product',
      notes: 'Get product per inventory detil',
      tags: ['api'],
    }
});

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

server.register([ inert, vision,
    {
        'register': hapiSwagger,
        'options': options
    }], (err) => {
      if (err)
        console.log(err)
    });


server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

server.ext('onPreResponse', preResponse);


module.exports = server;
