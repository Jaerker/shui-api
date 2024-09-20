const {agent} = require('../../../utils/db/agent');
const response = require('../../../responses/handler');

exports.handler = async (event) => {

    const data = await agent.messages.getAll();

    if(data)
        return response.Success(data);

    return response.NotFound('No messages found');

};