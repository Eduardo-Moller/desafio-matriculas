const { isEmpty } = require('../helpers/helpers');
const { insertUpdateTable } = require('../helpers/sqlHelpers');

async function createClasses(data) {
    const classesResult = await insertUpdateTable('classes', data);

    if (isEmpty(classesResult)) return {};

    return classesResult;
}

module.exports = { createClasses };
