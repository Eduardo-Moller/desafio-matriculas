const authModel = require('../models/authModel.js');

async function login(body) {
    return await authModel.login(body);
}

async function register(body) {
    return await authModel.register(body);
}

function createToken(id) {
    return authModel.createToken(id);
}

module.exports = { login, register, createToken };
