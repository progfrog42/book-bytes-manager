import {$host} from "../index";

export const getAllGenres = async () => {
    const {data} = await $host.get(`genre`)
    return data
}

export const getAllGenresByBookId = async (id) => {
    const {data} = await $host.get(`genre/by-book-id/${id}`)
    return data
}

export const changeGenreName = async (name, id, token, id_auth) => {
    const {data} = await $host.post(`genre/change-name`, {id, name}, {headers: {Authorization: `Bearer ${token} ${id_auth}`}})
    return data
}

export const deleteGenreById = async (id, token, id_auth) => {
    const {data} = await $host.delete(`genre/delete/${id}`, {headers: {Authorization: `Bearer ${token} ${id_auth}`}})
    return data
}

export const createGenre = async (name, token, id) => {
    const {data} = await $host.post(`genre`, {name}, {headers: {Authorization: `Bearer ${token} ${id}`}})
    return data
}