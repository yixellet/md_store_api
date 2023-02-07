const { getAllMetadata } = require('../../controllers/metadata');

const router = require('express').Router();

const fieldsRouter = require('./fields');

router.get('/', getAllMetadata);
router.use('/fields', fieldsRouter);

module.exports = router;