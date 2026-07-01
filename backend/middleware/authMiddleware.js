const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    try {

        const authHeader = req.header("Authorization");

        if (!authHeader) {

            return res.status(401).json({

                success: false,

                message: "Access denied. No token provided."

            });

        }

        const token = authHeader.startsWith("Bearer ")

            ? authHeader.split(" ")[1]

            : authHeader;

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        if (!decoded.id) {

            return res.status(401).json({

                success: false,

                message: "Invalid token."

            });

        }

        req.user = decoded;

        next();

    }

    catch (error) {

        return res.status(401).json({

            success: false,

            message: "Authentication failed."

        });

    }

};