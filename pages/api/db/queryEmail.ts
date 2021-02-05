import AWS from 'aws-sdk'

AWS.config.update({ accessKeyId: process.env.DB_ACCESSKEY_ID, secretAccessKey: process.env.DB_SECRETACCESS_KEY, region: 'ap-southeast-2' })

var docClient = new AWS.DynamoDB.DocumentClient({ endpoint: process.env.DB_ENDPOINT })

export const doesEmailExist = async (email: string) => {
  var params = {
    TableName: process.env.DB_TABLENAME,
    KeyConditionExpression: '#em = :email',
    ExpressionAttributeNames: {
      '#em': 'email'
    },
    ExpressionAttributeValues: {
      ':email': email
    }
  }

  return await docClient
    .query(params, (err, data) => {
      if (err) {
      } else {
        data.Items.forEach((item) => {
          if (item.email === email) {
            return true
          }
        })
        return false
      }
    })
    .promise()
}
