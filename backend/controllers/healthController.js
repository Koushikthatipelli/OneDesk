
const FoodLog = require("../models/FoodLog");
const WaterLog = require("../models/WaterLog");
const foods = require("../data/foods.json");
exports.getAnalytics = async (req,res)=>{}

// Add Food

exports.addFood = async (req, res) => {

    try {

        const {
            foodName,
            quantity,
            mealType
        } = req.body;

        const food = foods.find(
            item =>
                item.name.toLowerCase() ===
                foodName.toLowerCase()
        );

        if (!food) {

            return res.status(404).json({
                message: "Food not found"
            });

        }

        const calories =
            food.calories * quantity;

        const protein =
            food.protein * quantity;

        const carbs =
            food.carbs * quantity;

        const fats =
            food.fats * quantity;

        const foodLog =
            await FoodLog.create({

                user: req.user.id,

                foodName,
                quantity,
                mealType,

                calories,
                protein,
                carbs,
                fats

            });

        res.status(201).json(foodLog);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get Foods

exports.getFoods = async (req, res) => {

    try {

        const foods =
            await FoodLog.find({
                user: req.user.id
            }).sort({
                createdAt: -1
            });

        res.status(200).json(
            foods
        );

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Add Water

exports.addWater = async (req, res) => {

    try {

        const water =
            await WaterLog.create({

                user: req.user.id,

                amount:
                    req.body.amount

            });

        res.status(201).json(
            water
        );

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// Delete Food

exports.deleteFood = async (req, res) => {

    try {

        const food =
            await FoodLog.findById(
                req.params.id
            );

        if (!food) {

            return res.status(404).json({
                message: "Food log not found"
            });

        }

        await food.deleteOne();

        res.status(200).json({
            message:
                "Food log deleted successfully"
        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.getWater = async (req, res) => {

    try {

        const logs =
            await WaterLog.find({
                user: req.user.id
            }).sort({
                createdAt: -1
            });

        const totalWater =
            logs.reduce(
                (sum, log) =>
                    sum + log.amount,
                0
            );

        res.status(200).json({

            totalWater,
            logs

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.deleteWater = async (req, res) => {

    try {

        const water =
            await WaterLog.findById(
                req.params.id
            );

        if (!water) {

            return res.status(404).json({
                message: "Water log not found"
            });

        }

        await water.deleteOne();

        res.status(200).json({
            message: "Water log deleted"
        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


exports.getAnalytics = async (req, res) => {

    try {

        // analytics code here

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


exports.getAnalytics = async (req, res) => {

    try {

        const days = [];

        for (let i = 6; i >= 0; i--) {

            const date = new Date();

            date.setDate(
                date.getDate() - i
            );

            const start =
                new Date(date);

            start.setHours(
                0, 0, 0, 0
            );

            const end =
                new Date(date);

            end.setHours(
                23, 59, 59, 999
            );

            const foods =
                await FoodLog.find({

                    user: req.user.id,

                    createdAt: {
                        $gte: start,
                        $lte: end
                    }

                });

            const waters =
                await WaterLog.find({

                    user: req.user.id,

                    createdAt: {
                        $gte: start,
                        $lte: end
                    }

                });

            const totalCalories =
                foods.reduce(
                    (sum, food) =>
                        sum + food.calories,
                    0
                );

            const totalProtein =
                foods.reduce(
                    (sum, food) =>
                        sum + food.protein,
                    0
                );

            const totalWater =
                waters.reduce(
                    (sum, water) =>
                        sum + water.amount,
                    0
                );

            days.push({

                day:
                    date.toLocaleDateString(
                        "en-US",
                        {
                            weekday: "short"
                        }
                    ),

                calories:
                    totalCalories,

                protein:
                    Number(
                        totalProtein.toFixed(1)
                    ),

                water:
                    totalWater

            });

        }

        res.status(200).json(
            days
        );

    }

    catch (error) {

        res.status(500).json({
            message:
                error.message
        });

    }

};

