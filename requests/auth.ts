import axios from 'axios'

export const getAuthStatus = async () => {
  try {
    const { data } = await axios.get('api/permission')
    return data
  } catch (error) {
    console.log(error)
  }
}
