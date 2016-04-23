const boom = require('boom');
const productPerInventoryDetilRepository = require('../repository/productPerInventoryDetil');

const productPerInventoryDetil = {
  index: (req, res) => {
    productPerInventoryDetilRepository.all(req.query, (result) => {
      if (result.error)
        res(boom.badRequest(result.error.message));
      else
        res(result);
    })
  },
}

module.exports = productPerInventoryDetil;
