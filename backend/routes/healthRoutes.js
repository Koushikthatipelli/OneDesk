
const express = require("express");

const router = express.Router();

const auth =
    require("../middleware/authMiddleware");

const {
    addFood,
    getFoods,
    addWater,
    getWater,
    deleteFood,
    deleteWater,
    getAnalytics,
    searchFoods

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

router.delete(
    "/food/:id",
    auth,
    deleteFood
);
router.get(
    "/search",
    auth,
    searchFoods
);
router.get(
    "/analytics",
    auth,
    getAnalytics
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

router.delete(
    "/water/:id",
    auth,
    deleteWater
);

module.exports = router;

