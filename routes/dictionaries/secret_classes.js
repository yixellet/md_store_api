const { getSecretClasses, getSecretClass } = require('../../controllers/dictionaries/secret_classes');

const router = require('express').Router();

router.get('/', getSecretClasses);
router.get('/:id', getSecretClass);

module.exports = router;