import {$host} from "../index";

export const createBook = async (formData, token, id) => {
    const {data} = await $host.post('book', formData, {headers: {Authorization: `Bearer ${token} ${id}`}})
    return data
}

export const changeBook = async (formData, token, id) => {
    const {data} = await $host.post(`book/change-book`, formData, {headers: {Authorization: `Bearer ${token} ${id}`}})
    return data
}

export const getBookByToken = async (token) => {
    const {data} = await $host.get(`book/by-token/${token}`)
    return data
}

export const getAllBooks = async (token, id) => {
    const {data} = await $host.get(`book/all-books`, {headers: {Authorization: `Bearer ${token} ${id}`}})
    return data
}

export const downloadBook = async (filename, type) => {
    const {data} = await $host.get(`book/download-book/?filename=${filename}&type=${type}`, {responseType: 'blob'})
    return data
}

export const deleteBookById = async (id, token, id_auth) => {
    const {data} = await $host.delete(`book/delete/${id}`, {headers: {Authorization: `Bearer ${token} ${id_auth}`}})
    return data
}

export const getBooksByOrderId = async (id) => {
    const {data} = await $host.get(`book/by-order-id/${id}`)
    return data
}