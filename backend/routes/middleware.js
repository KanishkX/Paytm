const jwt = require("jsonwebtoken");
const  JWT_SECRET = require("../config");

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).send({
            msg: "Does not contain bearer"
        });
    }

    const realToken = token.split(" ")[1];
    try {
        const decodedToken = jwt.verify(realToken, JWT_SECRET);
        req.userId = decodedToken.userId; // Extracting userId from the decoded token
        next();
    } catch (err) {
        return res.status(403).json({ msg: "Forbidden" });
    }
};

module.exports = {
    authMiddleware
};
