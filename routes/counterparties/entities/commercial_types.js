const { getCommercialTypes, getCommercialType } = require('../../../controllers/counterparties/entities/commercial_types');

const router = require('express').Router();

router.get('/', getCommercialTypes);
router.get('/:id', getCommercialType);

module.exports = router;