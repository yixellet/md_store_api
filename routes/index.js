const router = require('express').Router();
const {
    getGroups,
    getAccessConditions,
    getHeightSystems,
    getReferenceSystems,
    getRegions,
    getScales,
    getSecretClasses,
    getStorageFormats,
    getSubtypes
} = require('../controllers/dictionaries');

router.get('/groups', getGroups);
router.get('/access_conditions', getAccessConditions);
router.get('/height_systems', getHeightSystems);
router.get('/reference_systems', getReferenceSystems);
router.get('/regions', getRegions);
router.get('/scales', getScales);
router.get('/secret_classes', getSecretClasses);
router.get('/storage_formats', getStorageFormats);
router.get('/subtypes', getSubtypes);

module.exports = router;
