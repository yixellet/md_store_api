const { getStorageFormats, getStorageFormat } = require('../../controllers/dictionaries/storage_formats');

const router = require('express').Router();

router.get('/', getStorageFormats);
router.get('/:id', getStorageFormat);

module.exports = router;