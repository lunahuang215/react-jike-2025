import request from '@/utils/request'

export const loginAPI = (data) => {
    return request({
        url: '/authorizations',
        method: 'POST',
        data
    })
}

export const getUserInfoAPI = () => {
    return request({
        url: '/user/profile',
        method: 'GET'
    })
}