const boom = require('boom');
const discountTotalPurchaseRepository = require('../repository/discountTotalPurchase');

const discountTotalPurchase = {
  index: (req, res) => {
    discountTotalPurchaseRepository.all(req.query, (discountTotalPurchase) => {
      if (discountTotalPurchase.error)
        res(boom.badRequest(discountTotalPurchase.error.message));
      else
        res(discountTotalPurchase);
    })
  },
  create: (req, res) => {
    discountTotalPurchaseRepository.create(req.payload, (discountTotalPurchase) => {
      if (discountTotalPurchase.error)
        res(boom.badRequest(discountTotalPurchase.error.message));
      else
        res(discountTotalPurchase);
    })
  },
  update: (req, res) => {
    discountTotalPurchaseRepository.update(req.params.id,
      req.payload,
      (discountTotalPurchase) => {
        if (discountTotalPurchase.error)
          res(boom.badRequest(discountTotalPurchase.error.message));
        else
          res(discountTotalPurchase);
      })
  },
  show: (req, res) => {
    discountTotalPurchaseRepository.show(req.params, (discountTotalPurchase) => {
      if (discountTotalPurchase.error)
        res(boom.badRequest(discountTotalPurchase.error.message));
      else
        res(discountTotalPurchase);
    })
  },
  destroy: (req, res) => {
    discountTotalPurchaseRepository.delete(req.params.id, (discountTotalPurchase) => {
      if (discountTotalPurchase.error)
        res(boom.badRequest(discountTotalPurchase.error.message));
      else
        res(discountTotalPurchase);
    })
  }
}

module.exports = discountTotalPurchase;
