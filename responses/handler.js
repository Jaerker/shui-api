const Success = (data) => {
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}

const Error = (message) => {
    return {
        statusCode: 400,
        errorMessage: message ? message : 'Bad Request'
    }
}

const NotFound = (message) => {
    return {
        statusCode: 404,
        errorMessage: message ? message : 'Data not found'
    }
}

module.exports = {Success, Error, NotFound}