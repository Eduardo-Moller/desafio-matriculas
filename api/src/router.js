const express = require('express');
const auth = require('./routes/auth/authRouter');

const router = express.Router();

router.use('/auth', auth);

router.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running' });
});

module.exports = router;
