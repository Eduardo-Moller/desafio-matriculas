require('dotenv').config();
const sqlHelpers = require('../helpers/sqlHelpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { isEmpty } = require('../helpers/helpers');
const { getUserById } = require('./userModel');

async function login(userData) {
    const { login, password } = userData;
    const retrievedUser = await sqlHelpers.selectTable('users', { login, deleted: false });
    if (isEmpty(retrievedUser)) return { auth: false };
    const isValidPassword = bcrypt.compareSync(password, retrievedUser.password);
    if (!isEmpty(retrievedUser) && isValidPassword) {
        const token = jwt.sign({ id: retrievedUser.id }, process.env.JWT_SECRET, { expiresIn: 3600 });
        const authenticatedUser = await getUserById(retrievedUser.id);
        return { auth: true, token, user: authenticatedUser };
    } else {
        return { auth: false };
    }
}

async function register(userData) {
    const plainPassword = userData.password;
    const hashedPassword = bcrypt.hashSync(userData.password, 12);
    const result = await sqlHelpers.insertUpdateTable('users', { ...userData, password: hashedPassword });
    if (!isEmpty(result)) {
        return await login({ ...userData, password: plainPassword });
    } else {
        return { error: true, message: 'Registration failed' };
    }
}

module.exports = { login, register };
