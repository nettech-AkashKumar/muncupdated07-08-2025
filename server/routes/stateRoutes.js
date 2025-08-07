const express = require("express");
const router = express.Router();
const stateController = require("../controllers/stateController");

router.post("/", stateController.addState);
router.post("/import", stateController.bulkImportStates);
router.get("/", stateController.getAllStates);
router.get('/states/country/:countryId', stateController.getStatesByCountry);

router.put("/:id", stateController.updateState);
router.delete("/:id", stateController.deleteState);

module.exports = router;
