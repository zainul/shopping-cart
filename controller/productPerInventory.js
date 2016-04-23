const boom = require('boom');
const productPerInventoryRepository = require('../repository/productPerInventory');

const productPerInventory = {
  index: (req, res) => {
    productPerInventoryRepository.all(req.query, (productPerInventory) => {
      if (productPerInventory.error)
        res(boom.badRequest(productPerInventory.error.message));
      else
        res(productPerInventory);
    })
  },
  create: (req, res) => {
    productPerInventoryRepository.create(req.payload, (productPerInventory) => {
      if (productPerInventory.error)
        res(boom.badRequest(productPerInventory.error.message));
      else
        res(productPerInventory);
    })
  },
  update: (req, res) => {
    productPerInventoryRepository.update(req.params.id,
      req.payload,
      (productPerInventory) => {
        if (productPerInventory.error)
          res(boom.badRequest(productPerInventory.error.message));
        else
          res(productPerInventory);
      })
  },
  show: (req, res) => {
    productPerInventoryRepository.show(req.params, (productPerInventory) => {
      if (productPerInventory.error)
        res(boom.badRequest(productPerInventory.error.message));
      else
        res(productPerInventory);
    })
  },
  destroy: (req, res) => {
    productPerInventoryRepository.delete(req.params.id, (productPerInventory) => {
      if (productPerInventory.error)
        res(boom.badRequest(productPerInventory.error.message));
      else
        res(productPerInventory);
    })
  }
}

module.exports = productPerInventory;
