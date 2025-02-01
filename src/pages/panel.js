import React from 'react';
import styles from "../styles/pages/panel.module.css"
import PagesList from "../components/PagesList";
import BooksWindow from "./windows/BooksWindow";
import GenresWindow from "./windows/GenresWindow";
import {useParams} from "react-router-dom";
import OrdersWindow from "./windows/OrdersWindow";

const Panel = () => {

    const {id} = useParams()

    const windows = [
        {
            page: 1,
            Component: BooksWindow,
        },
        {
            page: 2,
            Component: GenresWindow,
        },
        {
            page: 3,
            Component: OrdersWindow,
        }
    ]

    return (
        <div className={styles.block}>
            <PagesList />
            {windows.map(win =>
                <>
                    {win.page === Number(id) &&
                        <win.Component />
                    }
                </>
            )}
        </div>
    );
};

export default Panel;