const { getPersons, getPerson, createPerson } = require('../../../controllers/counterparties/persons');

const router = require('express').Router();

router.get('/', getPersons);
router.get('/:id', getPerson);
router.post('/', createPerson);

module.exports = router;