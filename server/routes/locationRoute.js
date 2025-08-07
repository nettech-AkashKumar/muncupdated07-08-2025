// const express = require('express');
// const router = express.Router();
// const locationController = require('../controllers/cityController');
// router.post('/locations', locationController.createLocation);
// router.get('/locations',  locationController.getAllLocations);
// // router.post('/location', createLocation);
// router.put('/location', locationController.updateLocation);
// router.delete('/location',locationController. deleteLocation);
// // router.get('/location', getAllLocations);
// router.get('/location/:country/states',locationController. getStatesByCountry);
// router.get('/location/:country/:state/cities',locationController. getCitiesByState);


// module.exports = router;


const express = require('express');
const router = express.Router();
const locationController = require('../controllers/cityController');

// Create and fetch
router.post('/locations', locationController.createLocation);
router.get('/locations', locationController.getAllLocations);

// Delete
router.delete('/locations/country/:country', locationController.deleteCountry);
router.delete('/locations/state/:state', locationController.deleteState);
router.delete('/locations/city/:city', locationController.deleteCity);

// Edit
router.put('/locations/edit-country', locationController.editCountry);
router.put('/locations/edit-state', locationController.editState);
router.put('/locations/edit-city', locationController.editCity);

module.exports = router;

