
const productCategoryRepository = require('../repository/productCategory');

const productCategory = {
  index: (req, res) => {
    productCategoryRepository.all((productCategory) => {
      res(productCategory);
    })
  },
  create: (req, res) => {
    productCategoryRepository.create(req.payload, (productCategory) => {
      res(productCategory);
    })
  },
  update: (req, res) => {
    productCategoryRepository.update(req.params.id,
      req.payload,
      (productCategory) => {
        res(productCategory);
      })
  },
  show: (req, res) => {
    productCategoryRepository.show(req.params, (productCategory) => {
      res(productCategory);
    })
  },
  destroy: (req, res) => {
    productCategoryRepository.delete(req.params.id, (productCategory) => {
      res(productCategory);
    })
  }
}

module.exports = productCategory;
