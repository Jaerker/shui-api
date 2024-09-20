const {agent} = require('../../../utils/db/agent');
const response = require('../../../responses/handler');

exports.handler = async (event) => {

    try{
        const data = JSON.parse(event.body);

        if(data){
            await agent.messages.create(data);
            
            return response.Success('Message successfully created.');
        }
        return response.NotFound('No data in body');
    }catch(e){
        return response.Error(e);
    }
};