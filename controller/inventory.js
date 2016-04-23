const boom = require('boom');
const inventoryRepository = require('../repository/inventory');

const inventory = {
  index: (req, res) => {
    inventoryRepository.all(req.query, (inventory) => {
      if (inventory.error)
        res(boom.badRequest(inventory.error.message));
      else
        res(inventory);
    })
  },
  create: (req, res) => {
    inventoryRepository.create(req.payload, (inventory) => {
      if (inventory.error)
        res(boom.badRequest(inventory.error.message));
      else
        res(inventory);
    })
  },
  update: (req, res) => {
    inventoryRepository.update(req.params.id,
      req.payload,
      (inventory) => {
        if (inventory.error)
          res(boom.badRequest(inventory.error.message));
        else
          res(inventory);
      })
  },
  show: (req, res) => {
    inventoryRepository.show(req.params, (inventory) => {
      if (inventory.error)
        res(boom.badRequest(inventory.error.message));
      else
        res(inventory);
    })
  },
  destroy: (req, res) => {
    inventoryRepository.delete(req.params.id, (inventory) => {
      if (inventory.error)
        res(boom.badRequest(inventory.error.message));
      else
        res(inventory);
    })
  }
}

module.exports = inventory;
