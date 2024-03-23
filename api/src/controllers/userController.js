const userModel = require('../models/userModel.js');

async function getUsers(filters) {
    return await userModel.getUsers(filters);
}

module.exports = { getUsers };
