import service from '../plugins/axios'

export const sendEmail = (params) => service.post('/api/modPw/sendEmail', params)
