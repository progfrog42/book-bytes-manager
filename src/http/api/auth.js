import {$host} from "../index";

export const authAdmin = async (token, id) => {
    const {data} = await $host.get(`auth/?token=${token}&id=${id}`)
    return data
}

export const sendDataOnEmail = async () => {
    const {data} = await $host.post(`auth/create-token`)
    return data
}