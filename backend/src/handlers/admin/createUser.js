const AWS = require("aws-sdk");
const uuid = require("uuid");

const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.main = async (event) => {
    const { email, name, phone, address, company } = JSON.parse(event.body);

    const temporaryPassword = `Temp${uuid.v4().slice(0, 6)}!`;
    const params = {
        UserPoolId: process.env.USER_POOL_ID,
        Username: email,
        TemporaryPassword: temporaryPassword,
        UserAttributes: [
            { Name: "email", Value: email },
            { Name: "name", Value: name },
            { Name: "phone_number", Value: phone },
            { Name: "address", Value: address },
            { Name: "custom:company", Value: company },
        ],
    };

    try {
        await cognito.adminCreateUser(params).promise();
        await cognito.adminAddUserToGroup({
            GroupName: "user",
            UserPoolId: process.env.USER_POOL_ID,
            Username: email,
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "User created successfully", temporaryPassword }),
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message }),
        };
    }
}; 