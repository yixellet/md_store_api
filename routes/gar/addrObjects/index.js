const { getAddrObjects, getAddrObject } = require('../../../controllers/gar/addrObjects');

const router = require('express').Router();

router.get('/', getAddrObjects);
router.get('/:objectid', getAddrObject);

module.exports = router;