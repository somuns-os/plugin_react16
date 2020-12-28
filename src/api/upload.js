import service from '../plugins/axios'

export const uploadAvatar = (params) => service.post('/api/upload/avatar', params)
