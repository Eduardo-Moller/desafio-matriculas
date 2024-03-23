const subjectModel = require('../models/subjectModel.js');

async function getSubjects(filters) {
    return await subjectModel.getSubjects(filters);
}

module.exports = { getSubjects };
