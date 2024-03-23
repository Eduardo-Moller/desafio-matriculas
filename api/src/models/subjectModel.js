const { isEmpty } = require('../helpers/helpers');
const { selectAllTable } = require('../helpers/sqlHelpers');

async function getSubjects(filters) {
    filters.deleted = false;
    const subjectsResult = await selectAllTable('subjects', filters, 'subjects.id, subjects.name');

    if (isEmpty(subjectsResult)) return {};

    return subjectsResult;
}

module.exports = { getSubjects };
