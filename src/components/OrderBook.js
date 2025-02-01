import React from 'react';
import styles from "../styles/components/OrderBook.module.css"

const OrderBook = ({book}) => {
    return (
        <div className={styles.block}>
            <p className={styles.text}>{book.name}</p>
            <p className={styles.text + ' ' + styles.ml_auto}>{book.price} ₽</p>
        </div>
    );
};

export default OrderBook;