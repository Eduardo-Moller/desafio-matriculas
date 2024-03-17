require('dotenv').config();
const jwt = require('jsonwebtoken');

async function verifyJwt(req, res, next) {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            res.status(401).json({ error: true, message: 'Unauthorized' });
        }
        if (decoded) {
            next();
        }
    });
}

module.exports = { verifyJwt };
