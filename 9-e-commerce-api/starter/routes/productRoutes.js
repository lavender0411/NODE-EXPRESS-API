const express = require('express');
const router = express.Router();
const { authenticateUser, authorizedPermissions } = require('../middleware/authentication');

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require('../controllers/productController');

const { getSingleProductReviews } = require('../controllers/reviewController');

router
  .route('/')
  .get(getAllProducts)
  .post([authenticateUser, authorizedPermissions('admin')], createProduct);

router.route('/uploadImage').post([authenticateUser, authorizedPermissions('admin')], uploadImage);

router
  .route('/:id')
  .get(getSingleProduct)
  .patch([authenticateUser, authorizedPermissions('admin')], updateProduct)
  .delete([authenticateUser, authorizedPermissions('admin')], deleteProduct);

router.route('/:id/reviews').get(getSingleProductReviews);

module.exports = router;
