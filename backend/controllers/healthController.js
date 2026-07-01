const FoodLog = require("../models/FoodLog");
const WaterLog = require("../models/WaterLog");
const foods = require("../data/foods.json");

// ===========================
// Add Food
// ===========================

exports.addFood = async (req, res) => {

    try {

        const {
            foodName,
            quantity,
            mealType
        } = req.body;

        const food = foods.find(item =>
            item.name.toLowerCase() ===
            foodName.toLowerCase()
        );

        if (!food) {

            return res.status(404).json({
                message: "Food not found"
            });

        }

        const factor = Number(quantity) / 100;

        const calories =
            Number((food.calories * factor).toFixed(1));

        const protein =
            Number((food.protein * factor).toFixed(1));

        const carbs =
            Number((food.carbs * factor).toFixed(1));

        const fats =
            Number((food.fats * factor).toFixed(1));

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

// ===========================
// Get Foods
// ===========================

exports.getFoods = async (req, res) => {

    try {

        const foodLogs = await FoodLog.find({

            user: req.user.id

        }).sort({

            createdAt: -1

        });

        res.status(200).json(foodLogs);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ===========================
// Delete Food
// ===========================

exports.deleteFood = async (req, res) => {

    try {

        const food = await FoodLog.findById(

            req.params.id

        );

        if (!food) {

            return res.status(404).json({

                message: "Food log not found"

            });

        }

        await food.deleteOne();

        res.status(200).json({

            message: "Food deleted successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ===========================
// Add Water
// ===========================

exports.addWater = async (req, res) => {

    try {

        const water = await WaterLog.create({

            user: req.user.id,

            amount: req.body.amount

        });

        res.status(201).json(water);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ===========================
// Get Water
// ===========================

exports.getWater = async (req, res) => {

    try {

        const logs = await WaterLog.find({

            user: req.user.id

        }).sort({

            createdAt: -1

        });

        const totalWater = logs.reduce(

            (sum, log) => sum + log.amount,

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

// ===========================
// Delete Water
// ===========================

exports.deleteWater = async (req, res) => {

    try {

        const water = await WaterLog.findById(

            req.params.id

        );

        if (!water) {

            return res.status(404).json({

                message: "Water log not found"

            });

        }

        await water.deleteOne();

        res.status(200).json({

            message: "Water deleted"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};
// ===========================
// Health Analytics
// ===========================

exports.getAnalytics = async (req, res) => {

    try {

        const weekly = [];

        for (let i = 6; i >= 0; i--) {

            const date = new Date();

            date.setDate(date.getDate() - i);

            const start = new Date(date);
            start.setHours(0, 0, 0, 0);

            const end = new Date(date);
            end.setHours(23, 59, 59, 999);

            const foodLogs = await FoodLog.find({

                user: req.user.id,

                createdAt: {
                    $gte: start,
                    $lte: end
                }

            });

            const waterLogs = await WaterLog.find({

                user: req.user.id,

                createdAt: {
                    $gte: start,
                    $lte: end
                }

            });

            const calories = foodLogs.reduce(
                (sum, item) => sum + item.calories,
                0
            );

            const protein = foodLogs.reduce(
                (sum, item) => sum + item.protein,
                0
            );

            const carbs = foodLogs.reduce(
                (sum, item) => sum + item.carbs,
                0
            );

            const fats = foodLogs.reduce(
                (sum, item) => sum + item.fats,
                0
            );

            const water = waterLogs.reduce(
                (sum, item) => sum + item.amount,
                0
            );

            weekly.push({

                day: date.toLocaleDateString(
                    "en-US",
                    {
                        weekday: "short"
                    }
                ),

                calories: Number(calories.toFixed(1)),

                protein: Number(protein.toFixed(1)),

                carbs: Number(carbs.toFixed(1)),

                fats: Number(fats.toFixed(1)),

                water,

                meals: foodLogs.length

            });

        }

        const today = weekly[weekly.length - 1];

        const totalMeals =
            weekly.reduce(
                (sum, d) => sum + d.meals,
                0
            );

        res.status(200).json({

            success: true,

            today: {

                calories: today.calories,

                protein: today.protein,

                carbs: today.carbs,

                fats: today.fats,

                water: today.water,

                meals: today.meals

            },

            weekly,

            summary: {

                totalMeals,

                averageCalories: Number(

                    (
                        weekly.reduce(
                            (sum, d) =>
                                sum + d.calories,
                            0
                        ) / 7

                    ).toFixed(1)

                ),

                averageProtein: Number(

                    (
                        weekly.reduce(
                            (sum, d) =>
                                sum + d.protein,
                            0
                        ) / 7

                    ).toFixed(1)

                ),

                averageWater: Number(

                    (
                        weekly.reduce(
                            (sum, d) =>
                                sum + d.water,
                            0
                        ) / 7

                    ).toFixed(0)

                )

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ===========================
// Search Foods
// ===========================

exports.searchFoods = async (req, res) => {

    try {

        const query =
            (req.query.query || "").toLowerCase();

        if (!query) {

            return res.json([]);

        }

        const results = foods
            .filter(food =>
                food.name
                    .toLowerCase()
                    .includes(query)
            )
            .slice(0, 10);

        res.status(200).json(results);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};