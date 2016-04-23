const boom = require('boom');
const discountCouponRepository = require('../repository/discountCoupon');

const discountCoupon = {
  index: (req, res) => {
    discountCouponRepository.all(req.query, (discountCoupon) => {
      if (discountCoupon.error)
        res(boom.badRequest(discountCoupon.error.message));
      else
        res(discountCoupon);
    })
  },
  create: (req, res) => {
    discountCouponRepository.create(req.payload, (discountCoupon) => {
      if (discountCoupon.error)
        res(boom.badRequest(discountCoupon.error.message));
      else
        res(discountCoupon);
    })
  },
  update: (req, res) => {
    discountCouponRepository.update(req.params.id,
      req.payload,
      (discountCoupon) => {
        if (discountCoupon.error)
          res(boom.badRequest(discountCoupon.error.message));
        else
          res(discountCoupon);
      })
  },
  show: (req, res) => {
    discountCouponRepository.show(req.params, (discountCoupon) => {
      if (discountCoupon.error)
        res(boom.badRequest(discountCoupon.error.message));
      else
        res(discountCoupon);
    })
  },
  destroy: (req, res) => {
    discountCouponRepository.delete(req.params.id, (discountCoupon) => {
      if (discountCoupon.error)
        res(boom.badRequest(discountCoupon.error.message));
      else
        res(discountCoupon);
    })
  }
}

module.exports = discountCoupon;
