interface TableObject {
  TableName: string
  Item: TableItem
}
interface TableItem {
  email: string
  date: string
  info: User
}
interface User {
  name: string
  email: string
  password: string
}
