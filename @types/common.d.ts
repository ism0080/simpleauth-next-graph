declare interface TableObject {
  TableName: string
  Item: TableItem
}
declare interface TableItem {
  email: string
  date: string
  info: User
}
declare interface User {
  name: string
  email: string
  password: string
}
