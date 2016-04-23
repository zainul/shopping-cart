const boom = require('boom');
const receiveProductRepository = require('../repository/receiveProduct');

const receiveProduct = {
  index: (req, res) => {
    receiveProductRepository.all(req.query, (receiveProduct) => {
      if (receiveProduct.error)
        res(boom.badRequest(receiveProduct.error.message));
      else
        res(receiveProduct);
    })
  },
  create: (req, res) => {
    receiveProductRepository.create(req.payload, (receiveProduct) => {
      if (receiveProduct.error)
        res(boom.badRequest(receiveProduct.error.message));
      else
        res(receiveProduct);
    })
  },
  update: (req, res) => {
    receiveProductRepository.update(req.params.id,
      req.payload,
      (receiveProduct) => {
        if (receiveProduct.error)
          res(boom.badRequest(receiveProduct.error.message));
        else
          res(receiveProduct);
      })
  },
  show: (req, res) => {
    receiveProductRepository.show(req.params, (receiveProduct) => {
      if (receiveProduct.error)
        res(boom.badRequest(receiveProduct.error.message));
      else
        res(receiveProduct);
    })
  },
  destroy: (req, res) => {
    receiveProductRepository.delete(req.params.id, (receiveProduct) => {
      if (receiveProduct.error)
        res(boom.badRequest(receiveProduct.error.message));
      else
        res(receiveProduct);
    })
  }
}

module.exports = receiveProduct;
