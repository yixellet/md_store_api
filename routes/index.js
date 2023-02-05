const router = require('express').Router();

const dictionariesRouter = require('./dictionaries');
const lettersRouter = require('./letters');
const counterpartiesRouter = require('./counterparties');

router.use('/dictionaries', dictionariesRouter);
router.use('/letters', lettersRouter);
router.use('/counterparties', counterpartiesRouter);

module.exports = router;
