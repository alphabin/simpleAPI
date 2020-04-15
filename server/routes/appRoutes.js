const router = require("express").Router();


const apiController = require("../controller/apiController");

//Non Secure
router.get('/num_to_english/', apiController.getNumEnglish);

//Secure 
router.get('/num_to_english_secure/',apiController.getSecureNumEnglish);

module.exports = router;