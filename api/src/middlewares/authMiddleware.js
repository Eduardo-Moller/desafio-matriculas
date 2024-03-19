require('dotenv').config();
const jwt = require('jsonwebtoken');

async function verifyJwt(req, res, next = false) {
    const token = req.headers.authorization;
    if (!req.headers.authorization) res.status(401).json({ error: true, message: 'Unauthorized' });
    return jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            res.status(401).json({ error: true, message: 'Unauthorized' });
        }
        if (decoded) {
            if (next) next();
            return decoded;
        }
    });
}

module.exports = { verifyJwt };
