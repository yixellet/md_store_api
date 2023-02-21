const router = require('express').Router();


const { getDocuments, searchDocument, getDocument, createDocument, deleteDocument, updateDocument } = require('../../controllers/documents');
const typesRouter = require('./types');

router.get('/', getDocuments);
router.get('/search', searchDocument);
router.use('/types', typesRouter);
router.get('/:id', getDocument);
router.post('/', createDocument);
router.delete('/:id', deleteDocument);
router.patch('/:id', updateDocument);

module.exports = router;