const router = require('express').Router();
const { getAllEntities, createNewPerson } = require('../controllers/counterparties');
const {
    getGroups,
    getAccessConditions,
    getHeightSystems,
    getReferenceSystems,
    getAllRegions,
    getFederalDistricts,
    getRegionByFederalDistrict,
    getScales,
    getSecretClasses,
    getStorageFormats,
    getSubtypes,
    getSubtypesByGroup,
    getStorageFormatsByGroup
} = require('../controllers/dictionaries');

router.get('/groups', getGroups);
router.get('/access_conditions', getAccessConditions);
router.get('/height_systems', getHeightSystems);
router.get('/reference_systems', getReferenceSystems);
router.get('/regions', getAllRegions);
router.get('/federaldistricts', getFederalDistricts);
router.get('/regionbyfederaldistrict', getRegionByFederalDistrict);
router.get('/scales', getScales);
router.get('/secret_classes', getSecretClasses);
router.get('/storage_formats', getStorageFormats);
router.get('/storageformatsbygroup', getStorageFormatsByGroup);
router.get('/subtypes', getSubtypes);
router.get('/subtypesbygroup', getSubtypesByGroup);

router.get('/entities', getAllEntities);
router.get('/addperson', createNewPerson);

module.exports = router;
