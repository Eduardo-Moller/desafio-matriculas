const express = require('express');
const auth = require('./routes/auth/authRouter');
const user = require('./routes/auth/userRouter');
const subject = require('./routes/auth/subjectRouter');
const classes = require('./routes/auth/classesRouter');

const router = express.Router();

router.use('/auth', auth);
router.use('/users', user);
router.use('/subjects', subject);
router.use('/classes', classes);

router.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running' });
});

module.exports = router;
