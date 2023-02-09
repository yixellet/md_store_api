const { getPersons, getPerson, createPerson, updatePerson, deletePerson } = require('../../../controllers/counterparties/persons');

const router = require('express').Router();

router.get('/', getPersons);
router.get('/:id', getPerson);
router.post('/', createPerson);
router.patch('/:id', updatePerson);
router.delete('/:id', deletePerson);

module.exports = router;