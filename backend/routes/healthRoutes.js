
const express = require("express");

const router = express.Router();
const auth =
    require("../middleware/authMiddleware");
const {
    addFood,
    getFoods,
    addWater,
    getWater
} = require(
    "../controllers/healthController"
);

// Food Routes

router.post(
    "/food",
    auth,
    addFood
);

router.get(
    "/food",
    auth,
    getFoods
);

// Water Routes

router.post(
    "/water",
    auth,
    addWater
);

router.get(
    "/water",
    auth,
    getWater
);

module.exports = router;

