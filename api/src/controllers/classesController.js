const classesModel = require('../models/classesModel.js');

async function createClasses(data) {
    return await classesModel.createClasses(data);
}

module.exports = { createClasses };
