const { getIncorporationForm, getIncorporationForms } = require('../../controllers/counterparties/entities/incorporation_forms');

const router = require('express').Router();

router.get('/', getIncorporationForms);
router.get('/:id', getIncorporationForm);

module.exports = router;