import request from '@/utils/request'

export const getChannelListAPI = () => {
    return request({
        url: '/channels',
        method: 'GET'
    })
}

export const createArticleAPI = (data) => {
    return request({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data
    })
}

export const getArticleListAPI = (params) => {
    return request({
        url: '/mp/articles',
        method: 'GET',
        params
    })
}

export const deleteArticleAPI = (id) => {
    return request({
        url: `/mp/articles/${id}`,
        method: 'DELETE'
    })
}

export const getArticleDetailAPI = (id) => {
    return request({
        url: `/mp/articles/${id}`,
        method: 'GET'
    })
}

export const updateArticleAPI = (data) => {
    return request({
        url: `/mp/articles/${data.id}?draft=false`,
        method: 'PUT',
        data
    })
}