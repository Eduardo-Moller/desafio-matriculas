const { query } = require('../db/connect');
const { isEmpty } = require('../helpers/helpers');
const { selectAllTable } = require('../helpers/sqlHelpers');

async function getUserById(userId) {
    const getUserQuery = `
        SELECT
            users.id,
            users.name,
            users.type
        FROM
            public.users
        WHERE
            users.id = ${userId}`;

    const userResult = await query(getUserQuery);

    if (isEmpty(userResult)) return {};

    return userResult[0];
}

async function getUsers(filters) {
    filters.deleted = false;
    const userResult = await selectAllTable('users', filters, 'users.id, users.name, users.type');

    if (isEmpty(userResult)) return {};

    return userResult;
}

module.exports = { getUserById, getUsers };
