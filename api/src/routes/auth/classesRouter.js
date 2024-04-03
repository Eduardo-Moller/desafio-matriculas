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

router.get('/', async (req, res) => {
    const requests = await classesController.getClasses(req.query);
    if (!isEmpty(requests)) {
        res.status(200).json(requests);
    } else {
        res.status(204).json('No content found');
    }
});

router.post('/enroll', async (req, res) => {
    const requests = await classesController.enroll(req.body);
    if (requests.length > 0) {
        res.status(201).json(requests);
    } else {
        res.status(500).json('Error enrolling student');
    }
});

router.get('/enroll', async (req, res) => {
    const requests = await classesController.getEnrollments(req.query);
    if (!isEmpty(requests)) {
        res.status(200).json(requests);
    } else {
        res.status(204).json('No content found');
    }
});

module.exports = router;
