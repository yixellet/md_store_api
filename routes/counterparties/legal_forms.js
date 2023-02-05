const { getLegalForms, getLegalForm, createLegalForm, updateLegalForm, deleteLegalForm } = require('../../controllers/counterparties/entities/legal_forms');

const router = require('express').Router();

router.get('/', getLegalForms);
router.get('/:id', getLegalForm);
router.post('/', createLegalForm);
router.patch('/:id', updateLegalForm);
router.delete('/:id', deleteLegalForm);

module.exports = router;