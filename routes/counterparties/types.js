const { getCounterpartyTypes, getCounterpartyType } = require('../../controllers/counterparties/types');

const router = require('express').Router();

router.get('/', getCounterpartyTypes);
router.get('/:id', getCounterpartyType);

module.exports = router;