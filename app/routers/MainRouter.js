const express = require("express");
const router = express.Router();

const MainController = require('../controllers/MainController');
const APIController = require('../controllers/APIController');

router.get('/extract', MainController.main);

router.get('/api/numbers/page/:page?', APIController.api);

module.exports = router;