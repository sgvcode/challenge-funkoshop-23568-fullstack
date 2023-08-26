const licenceModel = require('../models/licenceModel');

const getAllItemsLicences = async () => {
    return await licenceModel.getAll();
}

module.exports = {
    getAllItemsLicences,
}