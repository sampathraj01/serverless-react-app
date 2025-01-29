const AWS = require("aws-sdk");
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.main = async (event) => {
    const { email, password } = JSON.parse(event.body);
    const params = {
        AuthFlow: "ADMIN_NO_SRP_AUTH",
        ClientId: process.env.USER_POOL_CLIENT_ID,
        UserPoolId: process.env.USER_POOL_ID,
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
        },
    };

    try {
        const response = await cognito.adminInitiateAuth(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Login successful", data: response }),
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message }),
        };

    }

};

