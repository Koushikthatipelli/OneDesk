
const Note = require("../models/Note");

exports.createNote = async (req, res) => {

    try {

        const note =
            await Note.create({
                user: req.user.id,
                content: req.body.content
            });

        res.status(201).json(note);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.getNotes = async (req, res) => {

    try {

        const notes =
            await Note.find({
                user: req.user.id
            });

        res.status(200).json(notes);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.deleteNote = async (req, res) => {

    try {

        const note =
            await Note.findById(
                req.params.id
            );

        if (!note) {

            return res.status(404).json({
                message: "Note not found"
            });

        }

        await note.deleteOne();

        res.status(200).json({
            message:
            "Note deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

