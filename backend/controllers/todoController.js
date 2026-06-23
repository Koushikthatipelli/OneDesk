const Todo = require("../models/Todo");

// Create Todo
exports.createTodo = async (req, res) => {
    try {
        const todo = await Todo.create({
            user: req.user.id,
            title: req.body.title
        });

        res.status(201).json(todo);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Todos
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({
            user: req.user.id
        });

        res.status(200).json(todos);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Todo
exports.updateTodo = async (req, res) => {
    try {

        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        todo.title =
            req.body.title || todo.title;

        if (req.body.completed !== undefined) {
            todo.completed =
                req.body.completed;
        }

        const updatedTodo = await todo.save();

        res.status(200).json(updatedTodo);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Todo
exports.deleteTodo = async (req, res) => {
    try {

        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        await todo.deleteOne();

        res.status(200).json({
            message: "Todo deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};