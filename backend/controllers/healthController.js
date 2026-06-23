
const FoodLog = require("../models/FoodLog");
const WaterLog = require("../models/WaterLog");
const foods = require("../data/foods.json");

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

// Get Water

exports.getWater = async (req, res) => {

    try {

        const logs =
            await WaterLog.find({
                user: req.user.id
            });

        const totalWater =
            logs.reduce(
                (sum, log) =>
                    sum + log.amount,
                0
            );

        res.status(200).json({
            totalWater
        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

