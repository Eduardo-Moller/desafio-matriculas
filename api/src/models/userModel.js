const { query } = require('../db/connect');
const { isEmpty } = require('../helpers/helpers');

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

module.exports = { getUserById };
