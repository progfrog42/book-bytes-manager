import React from 'react';
import styles from "../styles/components/Book.module.css"
import {useNavigate} from "react-router-dom";
import {CHANGE_BOOK_ROUTE} from "../utils/consts";

const Book = ({ book, setVisibleModal, setBookIdForDelete }) => {

    const navigate = useNavigate()

    const deleteBook = () => {
        setVisibleModal(true)
        setBookIdForDelete(book.id)
    }

    const changeBook = () => {
        navigate(CHANGE_BOOK_ROUTE + book.token)
    }

    const src = process.env.REACT_APP_API_URL + 'image/' + book.image

    return (
        <div className={styles.block + ' fd'}>
            <img
                className={styles.image}
                src={src}
                alt="book image"
            />
            <p className={styles.name}>
                {book.name}
            </p>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <p
                    onClick={changeBook}
                    className={styles.change + ' ' + styles.btn}
                >
                    Редактировать
                </p>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <p
                    onClick={deleteBook}
                    className={styles.delete + ' ' + styles.btn}
                >
                    Удалить
                </p>
            </div>
        </div>
    );
};

export default Book;