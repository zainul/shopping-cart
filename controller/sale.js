const boom = require('boom');
const saleRepository = require('../repository/sale');

const sale = {
  index: (req, res) => {
    saleRepository.all(req.query, (sale) => {
      if (sale.error)
        res(boom.badRequest(sale.error.message));
      else
        res(sale);
    })
  },
  create: (req, res) => {
    saleRepository.create(req.payload, (sale) => {
      if (sale.error)
        res(boom.badRequest(sale.error.message));
      else
        res(sale);
    })
  },
  update: (req, res) => {
    saleRepository.update(req.params.id,
      req.payload,
      (sale) => {
        if (sale.error)
          res(boom.badRequest(sale.error.message));
        else
          res(sale);
      })
  },
  show: (req, res) => {
    saleRepository.show(req.params, (sale) => {
      if (sale.error)
        res(boom.badRequest(sale.error.message));
      else
        res(sale);
    })
  },
  destroy: (req, res) => {
    saleRepository.delete(req.params.id, (sale) => {
      if (sale.error)
        res(boom.badRequest(sale.error.message));
      else
        res(sale);
    })
  },
  preCheckout: (req, res) => {
    req.params.discountType = 'coupon';
    saleRepository.preCheckout(req.params.id, req.params, (sale) => {
      if (sale == null)
        res(sale)
      else {
        if (sale.error)
          res(boom.badRequest(sale.error.message));
        else
          res(sale);
      }
    })
  }
}

module.exports = sale;
