import AWS from 'aws-sdk'
AWS.config.update({ accessKeyId: process.env.DB_ACCESSKEY_ID, secretAccessKey: process.env.DB_SECRETACCESS_KEY, region: 'ap-southeast-2' })

var docClient = new AWS.DynamoDB.DocumentClient({ endpoint: process.env.DB_ENDPOINT })

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
