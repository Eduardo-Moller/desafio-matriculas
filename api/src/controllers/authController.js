const authModel = require('../models/authModel.js');

async function login(body) {
    return await authModel.login(body);
}

async function register(body) {
    return await authModel.register(body);
}

module.exports = { login, register };
