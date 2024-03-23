const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const { isEmpty } = require('../../helpers/helpers');

router.get('/', async (req, res) => {
    const requests = await userController.getUsers(req.query);
    if (!isEmpty(requests)) {
        res.status(200).json(requests);
    } else {
        res.status(204).json('No content found');
    }
});

module.exports = router;
