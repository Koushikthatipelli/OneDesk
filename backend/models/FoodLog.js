const mongoose = require("mongoose");

const foodLogSchema = new mongoose.Schema(

    {

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },

        foodName: {

            type: String,

            required: true,

            trim: true

        },

        quantity: {

            type: Number,

            required: true,

            min: 1

        },

        mealType: {

            type: String,

            enum: [

                "Breakfast",

                "Lunch",

                "Dinner",

                "Snack"

            ],

            default: "Breakfast"

        },

        calories: {

            type: Number,

            default: 0

        },

        protein: {

            type: Number,

            default: 0

        },

        carbs: {

            type: Number,

            default: 0

        },

        fats: {

            type: Number,

            default: 0

        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model(

    "FoodLog",

    foodLogSchema

);