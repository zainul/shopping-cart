const boom = require('boom');
const productCategoryRepository = require('../repository/productCategory');

const productCategory = {
  index: (req, res) => {
    productCategoryRepository.all(req.query, (productCategory) => {
      if (productCategory.error)
        res(boom.badRequest(productCategory.error.message));
      else
        res(productCategory);
    })
  },
  create: (req, res) => {
    productCategoryRepository.create(req.payload, (productCategory) => {
      if (productCategory.error)
        res(boom.badRequest(productCategory.error.message));
      else
        res(productCategory);
    })
  },
  update: (req, res) => {
    productCategoryRepository.update(req.params.id,
      req.payload,
      (productCategory) => {
        if (productCategory.error)
          res(boom.badRequest(productCategory.error.message));
        else
          res(productCategory);
      })
  },
  show: (req, res) => {
    productCategoryRepository.show(req.params, (productCategory) => {
      if (productCategory.error)
        res(boom.badRequest(productCategory.error.message));
      else
        res(productCategory);
    })
  },
  destroy: (req, res) => {
    productCategoryRepository.delete(req.params.id, (productCategory) => {
      if (productCategory.error)
        res(boom.badRequest(productCategory.error.message));
      else
        res(productCategory);
    })
  }
}

module.exports = productCategory;
