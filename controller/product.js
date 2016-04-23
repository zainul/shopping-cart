const boom = require('boom');
const productRepository = require('../repository/product');

const product = {
  index: (req, res) => {
    productRepository.all(req.query, (product) => {
      if (product.error)
        res(boom.badRequest(product.error.message));
      else
        res(product);
    })
  },
  create: (req, res) => {
    productRepository.create(req.payload, (product) => {
      if (product.error)
        res(boom.badRequest(product.error.message));
      else
        res(product);
    })
  },
  update: (req, res) => {
    productRepository.update(req.params.id,
      req.payload,
      (product) => {
        if (product.error)
          res(boom.badRequest(product.error.message));
        else
          res(product);
      })
  },
  show: (req, res) => {
    productRepository.show(req.params, (product) => {
      if (product.error)
        res(boom.badRequest(product.error.message));
      else
        res(product);
    })
  },
  destroy: (req, res) => {
    productRepository.delete(req.params.id, (product) => {
      if (product.error)
        res(boom.badRequest(product.error.message));
      else
        res(product);
    })
  }
}

module.exports = product;
