import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import styles from "../styles/pages/order.module.css"
import styles_wp from "../styles/components/Wrapper.module.css"
import Grid from "../components/Grid";
import {getOrderById} from "../http/api/order";
import {getBooksByOrderId} from "../http/api/book";
import HeightWrapper from "../components/HeightWrapper";
import {PANEL_ROUTE} from "../utils/consts";
import OrderBook from "../components/OrderBook";
import Cookies from "universal-cookie/es6";

const Order = () => {

    const {id} = useParams()
    const navigate = useNavigate()
    const cookies = new Cookies()

    const [order, setOrder] = useState(null)
    const [books, setBooks] = useState([])

    const [loading, setLoading] = useState(true)

    const token = cookies.get('token') || 'n'
    const id_auth = cookies.get('id') || 'n'

    useEffect(() => {
        getOrderById(id, token, id_auth).then(data => {
            setOrder(data)
            getBooksByOrderId(data.id).then(data => {
                setBooks(data)
                setLoading(false)
            })
        })
    }, [])

    const back = () => {
        navigate(PANEL_ROUTE + '3')
    }

    if (loading) {
        return (
            <div className={styles_wp.block}>
                <svg
                    className={styles_wp.svg}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                >
                    <path d="M480.297-61.174q-88.196 0-164.577-32.042-76.38-32.043-133.421-89.083-57.04-57.041-89.083-133.37-32.042-76.329-32.042-164.8 0-88.307 32.036-164.16 32.036-75.852 88.991-133.053 56.954-57.2 133.198-89.455Q391.643-899.391 480-899.391q16.671 0 29.379 12.765 12.708 12.765 12.708 29.252t-12.708 29.105Q496.671-815.652 480-815.652q-140.125 0-237.888 97.774-97.764 97.774-97.764 237.913t97.774 237.878q97.774 97.739 237.913 97.739t237.878-97.764Q815.652-339.875 815.652-480q0-16.671 12.617-29.379 12.618-12.708 29.105-12.708 16.487 0 29.252 12.708T899.391-480q0 88.357-32.29 164.607-32.291 76.251-89.348 133.235-57.057 56.984-133.204 88.984-76.146 32-164.252 32Z"/>
                </svg>
            </div>
        )
    }

    return (
        <Grid>
            <HeightWrapper>
                <div className={styles.block}>
                    <div className={styles.line}>
                        <p className={styles.text + ' ' + styles.bold}>№ {order.number}</p>
                        <p
                            style={{marginLeft: "auto"}}
                            className={styles.text + ' ' + styles.bold}
                        >
                            {order.price} ₽
                        </p>
                    </div>
                    <div className={styles.line + ' ' + styles.mt}>
                        <p className={styles.text}>Токен:<br/> {order.token}</p>
                    </div>
                    <div className={styles.line + ' ' + styles.mt}>
                        <p className={styles.text}>{order.email}</p>
                        <p
                            style={{marginLeft: "3rem"}}
                            className={styles.text}
                        >
                            {order.name}
                        </p>
                        <p
                            onClick={back}
                            className={styles.text + ' ' + styles.back}
                        >
                            Назад
                        </p>
                    </div>
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.list}>
                        {books.map(book =>
                            <OrderBook book={book} />
                        )}
                    </div>
                </div>
            </HeightWrapper>
        </Grid>
    );
};

export default Order;