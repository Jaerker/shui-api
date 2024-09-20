const {agent} = require('../../../utils/db/agent');
const response = require('../../../responses/handler');

exports.handler = async (event) => {
    try{
        const {id} = event.pathParameters;

        const message = JSON.parse(event.body);
        if(!message)
            return response.NotFound('No data found in body.');

        if(!message.username || !message.text)
            return response.BadRequest('Invalid request, missing username or text');
        
        const updatedMessage = await agent.messages.getById(id);
        if(!updatedMessage)
            return response.NotFound('Message not found.');
        
        //Hitta något bättre sätt att göra detta på
        updatedMessage.dataBeforeUpdate.username = updatedMessage.username;
        updatedMessage.dataBeforeUpdate.text = updatedMessage.text;
        updatedMessage.updatedAt = new Date().toISOString();
        updatedMessage.username = message.username;
        updatedMessage.text = message.text;

        await agent.messages.update(id, updatedMessage);

        return response.Success('Message successfully updated.');

    }catch(e){
        return response.Error(e);
    }
};