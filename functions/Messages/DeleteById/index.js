const {agent} = require('../../../utils/db/agent');
const response = require('../../../responses/handler');

exports.handler = async (event) => {
    try{
        const {id} = event.pathParameters;
        await agent.messages.deleteById(id);
         
        return response.Success('Message successfully deleted.');
    }catch(e){
        return response.Error(e);
    }

};