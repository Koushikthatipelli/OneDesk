const Todo = require("../models/Todo");

// ============================
// Get All Tasks
// ============================

exports.getTodos = async (req, res) => {

    try {

        const todos = await Todo.find({

            user: req.user.id

        }).sort({

            createdAt: -1

        });

        res.status(200).json({

            success: true,

            todos

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ============================
// Add Task
// ============================

exports.createTodo = async (req, res) => {

    try {

        const {

            title,

            priority,

            dueDate

        } = req.body;

        const todo = await Todo.create({

            user: req.user.id,

            title,

            priority,

            dueDate

        });

        res.status(201).json({

            success: true,

            message: "Task created successfully",

            todo

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ============================
// Update Task
// ============================

exports.updateTodo = async (req, res) => {

    try {

        const todo = await Todo.findOne({

            _id: req.params.id,

            user: req.user.id

        });

        if (!todo) {

            return res.status(404).json({

                success: false,

                message: "Task not found"

            });

        }

        Object.assign(todo, req.body);

        await todo.save();

        res.status(200).json({

            success: true,

            message: "Task updated successfully",

            todo

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ============================
// Delete Task
// ============================

exports.deleteTodo = async (req, res) => {

    try {

        const todo = await Todo.findOne({

            _id: req.params.id,

            user: req.user.id

        });

        if (!todo) {

            return res.status(404).json({

                success: false,

                message: "Task not found"

            });

        }

        await todo.deleteOne();

        res.status(200).json({

            success: true,

            message: "Task deleted successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};