import React, {useEffect, useState} from 'react';
import styles from "../../styles/windows/BookWindow.module.css"
import Book from "../../components/Book";
import DeleteModal from "../../components/modals/DeleteModal";
import {useNavigate} from "react-router-dom";
import {CREATE_BOOK_ROUTE} from "../../utils/consts";
import {deleteBookById, getAllBooks} from "../../http/api/book";
import Cookies from "universal-cookie/es6";

const BooksWindow = () => {

    const cookies = new Cookies()

    const navigate = useNavigate()

    const [visibleModal, setVisibleModal] = useState(false)
    const [bookIdForDelete, setBookIdForDelete] = useState(-1)

    const [loading, setLoading] = useState(true)

    const [books, setBooks] = useState([])

    const token = cookies.get('token') || 'n'
    const id = cookies.get('id') || 'n'

    useEffect(() => {
        getAllBooks(token, id).then(data => {
            setBooks(data)
        })
    }, [])

    const deleteBook = () => {
        deleteBookById(bookIdForDelete, token, id).then(() => {
            setVisibleModal(false)
            setBookIdForDelete(-1)
            setBooks([])
            getAllBooks(token, id).then(data => {
                setBooks(data)
            })
        })
    }

    const toCreateBook = () => {
        navigate(CREATE_BOOK_ROUTE)
    }

    return (
        <>
            <DeleteModal
                text="Вы действительно хотите удалить эту книгу?"
                deleteFunc={deleteBook}
                visible={visibleModal}
                setVisible={setVisibleModal}
            />
            <div className={styles.block + ' fd'}>
                <div className={styles.up_line}>
                    <button
                        onClick={toCreateBook}
                        className={styles.btn_add}
                    >
                        Добавить книгу
                    </button>
                </div>
                <div className={styles.list}>
                    {books.map(book =>
                        <Book
                            book={book}
                            setVisibleModal={setVisibleModal}
                            setBookIdForDelete={setBookIdForDelete}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default BooksWindow;