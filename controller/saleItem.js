const boom = require('boom');
const saleItemRepository = require('../repository/saleItem');

const saleItem = {
  update: (req, res) => {
    saleItemRepository.update(req.params.id,
      req.payload,
      (saleItem) => {
        if (saleItem.error)
          res(boom.badRequest(saleItem.error.message));
        else
          res(saleItem);
      })
  },
  destroy: (req, res) => {
    saleItemRepository.delete(req.params.id, (saleItem) => {
      if (saleItem.error)
        res(boom.badRequest(saleItem.error.message));
      else
        res(saleItem);
    })
  }
}

module.exports = saleItem;
