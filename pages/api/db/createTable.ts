import AWS from 'aws-sdk'
import { constants } from '../functions/constants'

var dynamodb = new AWS.DynamoDB({ region: 'ap-southeast-2', endpoint: 'http://localhost:8000' })

var params = {
  TableName: constants.tableName,
  KeySchema: [
    { AttributeName: 'email', KeyType: 'HASH' }, // partition key
    { AttributeName: 'date', KeyType: 'RANGE' } // sort key
  ],
  AttributeDefinitions: [
    { AttributeName: 'email', AttributeType: 'S' },
    { AttributeName: 'date', AttributeType: 'S' }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
}
export const createTable = () => {
  dynamodb.createTable(params, function (err, data) {
    if (err) {
      console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2))
    } else {
      console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2))
    }
  })
}
