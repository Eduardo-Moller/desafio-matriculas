const express = require('express');
const router = express.Router();
const subjectController = require('../../controllers/subjectController');
const { isEmpty } = require('../../helpers/helpers');

router.get('/', async (req, res) => {
    const requests = await subjectController.getSubjects(req.query);
    if (!isEmpty(requests)) {
        res.status(200).json(requests);
    } else {
        res.status(204).json('No content found');
    }
});

module.exports = router;
