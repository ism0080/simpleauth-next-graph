import AWS from 'aws-sdk'

var docClient = new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-2', endpoint: 'http://localhost:8000' })

export const putData = async (params: TableObject) => {
  await docClient
    .put(params, function (err, data) {
      if (err) {
        console.log('Unable to add item. Error JSON:', JSON.stringify(err, null, 2))
      } else {
        console.log('Added item:', JSON.stringify(data, null, 2))
        return data
      }
    })
    .promise()
}

export const createUserPutObject = (tableName: string, data: User): TableObject => {
  return {
    TableName: tableName,
    Item: {
      email: data.email,
      date: new Date().toISOString(),
      info: data
    }
  }
}
