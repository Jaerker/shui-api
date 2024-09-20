const {agent} = require('../../../utils/db/agent');
const response = require('../../../responses/handler');

exports.handler = async (event) => {

    try{
        const {id} = event.pathParameters;

        const message = await agent.messages.getById(id);
        if(!message) 
            return response.NotFound(`Message with ID: ${id} not found.`);

        return response.Success(message);
    }catch(e){
        return response.Error(e);
    }
};