import AWS from 'aws-sdk'
import { constants } from '../functions/constants'

var docClient = new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-2', endpoint: 'http://localhost:8000' })

export const doesEmailExist = async (email: string) => {
  var params = {
    TableName: constants.tableName,
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
