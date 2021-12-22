const express = require("express");
const router = express.Router();

const MainController = require('../controllers/MainController');

router.get('/extract', MainController.extract);

module.exports = router;