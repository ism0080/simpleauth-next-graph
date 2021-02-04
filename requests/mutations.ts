export const loginMutation = `
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
}`

export const registerMutation = `
mutation Register($email: String!, $name: String, $password: String!) {
    register(email: $email, name: $name, password: $password)
}
`
export const logoutMutation = `
mutation {
    logout
}
`
