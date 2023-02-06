const { getPhoneTypes, getPhoneType, createPhoneType, updatePhoneType, deletePhoneType } = require('../../../controllers/counterparties/phones');

const router = require('express').Router();

router.get('/types', getPhoneTypes);
router.get('/types/:id', getPhoneType);
router.post('/types', createPhoneType);
router.patch('/types/:id', updatePhoneType);
router.delete('/types/:id', deletePhoneType);

module.exports = router;