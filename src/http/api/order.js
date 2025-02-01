import {$host} from "../index";

export const getAllOrders = async (token, id) => {
    const {data} = await $host.get(`order`, {headers: {Authorization: `Bearer ${token} ${id}`}})
    return data
}

export const getOrderById = async (id, token, id_auth) => {
    const {data} = await $host.get(`order/by-id/${id}`, {headers: {Authorization: `Bearer ${token} ${id_auth}`}})
    return data
}