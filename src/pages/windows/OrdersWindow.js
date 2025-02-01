import React, {useEffect, useState} from 'react';
import styles_bw from "../../styles/windows/BookWindow.module.css";
import styles from "../../styles/windows/OrdersWindow.module.css"
import {getAllOrders} from "../../http/api/order";
import {useNavigate} from "react-router-dom";
import {ORDER_ROUTE} from "../../utils/consts";
import Cookies from "universal-cookie/es6";

const OrdersWindow = () => {

    const cookies = new Cookies()
    const navigate = useNavigate()

    const [orders, setOrders] = useState([])

    const token = cookies.get('token') || 'n'
    const id = cookies.get('id') || 'n'

    useEffect(() => {
        getAllOrders(token, id).then(data => {
            setOrders(data.reverse())
        })
    }, [])

    return (
        <div className={styles_bw.block + ' fd'}>
            <div className={styles_bw.list}>
                <div className={styles.list}>
                    {orders.map(order =>
                        <div
                            onClick={() => navigate(ORDER_ROUTE + order.id)}
                            className={styles.order}
                        >
                            <p className={styles.number}>№ {order.number}</p>
                            <p className={styles.price}>{order.price} ₽</p>
                            <p className={styles.date}>
                                {order.createdAt.substring(8, 10)}.{order.createdAt.substring(5, 7)}.{order.createdAt.substring(0, 4)}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrdersWindow;