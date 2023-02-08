const router = require('express').Router();

const levelsRouter = require('./levels');
const typesRouter = require('./types');
const addrObjRouter = require('./addrObjects');

router.use('/levels', levelsRouter);
router.use('/types', typesRouter);
router.use('/addr_obj', addrObjRouter);

module.exports = router;