const express = require('express');
const router = express.Router();
const classesController = require('../../controllers/classesController');
const { isEmpty } = require('../../helpers/helpers');

router.post('/', async (req, res) => {
    const requests = await classesController.createClasses(req.body);
    if (!isEmpty(requests)) {
        res.status(201).json(requests);
    } else {
        res.status(500).json('Error creating class');
    }
});

module.exports = router;
