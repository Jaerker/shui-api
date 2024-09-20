const {agent} = require('../../../utils/db/agent');
const response = require('../../../responses/handler');

exports.handler = async (event) => {
    return response.Success('Successfully called the GET ALL API');

};