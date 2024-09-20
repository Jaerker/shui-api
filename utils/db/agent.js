const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');
const { v4: uuid } = require('uuid');

// DB Connection
const client = new DynamoDB();
const db = DynamoDBDocument.from(client);

const messages = {
    getAll: async () => await db.query({
        TableName: 'shui-message-board-db',
        KeyConditionExpression: 'pk = :pk',
        ExpressionAttributeValues: {
            ':pk': 'message',
        },
    }).then(res => res.Items).catch(e => e),

    getById: async (id) => {
        try{
            const {Item} = await db.get({
                TableName: 'shui-message-board-db',
                Key: {
                    pk:'message',
                    id: id
                }
            });
            return Item;
        }catch(e){
           return null;
        }
    },

    create: async (data) => await db.put({
        TableName: 'shui-message-board-db',
        Item: {
            pk:'message',
            id: uuid(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            dataBeforeUpdate: {},
            ...data
        }
    }),

    update: async (id, data) => await db.put({
        TableName:'shui-message-board-db',
        Item: data
    }),

    deleteById: async (id) => await db.delete({
        TableName:'shui-message-board-db',
        Key: {
            pk:'message',
            id: id
        }
    })
}

const agent = {
    messages
}

module.exports = {agent};