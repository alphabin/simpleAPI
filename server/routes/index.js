const router = require("express").Router();


const appRequestRoutes = require("./appRoutes");

router.use(appRequestRoutes);

module.exports = router;