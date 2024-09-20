const {agent} = require('../../../utils/db/agent');
const response = require('../../../responses/handler');

exports.handler = async (event) => {

    try{
        const data = JSON.parse(event.body);

        if(data){
            const res = await agent.messages.create(data);
            
            if(res['$metadata'].httpStatusCode === '200')
                return response.Success('Successfully created message');
            return response.Error(res);
        }
    
    
        return response.NotFound('No data in body');
    }catch(e){
        return response.Error(e)
    }
};