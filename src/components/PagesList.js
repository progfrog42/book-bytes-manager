import React from 'react';
import styles from "../styles/components/PagesList.module.css"
import {useNavigate} from "react-router-dom";
import {PANEL_ROUTE} from "../utils/consts";

const PagesList = ({ window, setWindow }) => {

    const navigate = useNavigate()

    return (
        <div className={styles.list}>
            <p
                onClick={() => navigate(PANEL_ROUTE + '1')}
                className={styles.item + ' ' + (window === 1 && styles.current)}
            >
                Книги
            </p>
            <p
                onClick={() => navigate(PANEL_ROUTE + '2')}
                className={styles.item + ' ' + (window === 2 && styles.current)}
            >
                Жанры
            </p>
            <p
                onClick={() => navigate(PANEL_ROUTE + '3')}
                className={styles.item + ' ' + (window === 2 && styles.current)}
            >
                Заказы
            </p>
            <p
                onClick={() => navigate(PANEL_ROUTE + '4')}
                className={styles.item + ' ' + (window === 3 && styles.current)}
            >
                Продажи
            </p>
        </div>
    );
};

export default PagesList;