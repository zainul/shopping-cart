const boom = require('boom');
const couponRepository = require('../repository/coupon');

const coupon = {
  index: (req, res) => {
    couponRepository.all(req.query, (coupon) => {
      if (coupon.error)
        res(boom.badRequest(coupon.error.message));
      else
        res(coupon);
    })
  },
  create: (req, res) => {
    couponRepository.create(req.payload, (coupon) => {
      if (coupon.error)
        res(boom.badRequest(coupon.error.message));
      else
        res(coupon);
    })
  },
  update: (req, res) => {
    couponRepository.update(req.params.id,
      req.payload,
      (coupon) => {
        if (coupon.error)
          res(boom.badRequest(coupon.error.message));
        else
          res(coupon);
      })
  },
  show: (req, res) => {
    couponRepository.show(req.params, (coupon) => {
      if (coupon.error)
        res(boom.badRequest(coupon.error.message));
      else
        res(coupon);
    })
  },
  destroy: (req, res) => {
    couponRepository.delete(req.params.id, (coupon) => {
      if (coupon.error)
        res(boom.badRequest(coupon.error.message));
      else
        res(coupon);
    })
  }
}

module.exports = coupon;
