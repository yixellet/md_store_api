const { getDocumentTypes, getDocumentType } = require('../../controllers/documents/types');

const router = require('express').Router();


router.get('/', getDocumentTypes);
router.get('/:id', getDocumentType);

module.exports = router;