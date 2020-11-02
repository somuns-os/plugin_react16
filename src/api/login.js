import service from '../plugins/axios'

export const loginPost = (params) => service.post('/api/login', params)

export const registerPost = (params) => service.post('/api/signup', params)
