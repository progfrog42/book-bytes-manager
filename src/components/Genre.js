import React from 'react';
import styles from "../styles/components/Genre.module.css"
import {deleteGenreById} from "../http/api/genre";

const Genre = ({ genre, setCurrentId, setVisibleModal, setVisibleDeleteModal }) => {

    const openModal = () => {
        setCurrentId(genre.id)
        setVisibleModal(true)
    }

    const deleteGenre = () => {
        setCurrentId(genre.id)
        setVisibleDeleteModal(true)
    }

    return (
        <div className={styles.block + ' fd'}>
            <p className={styles.text}>{genre.name}</p>
            <p
                onClick={openModal}
                className={styles.change + ' ' + styles.btn}
            >
                Редактировать
            </p>
            <p
                onClick={deleteGenre}
                className={styles.delete + ' ' + styles.btn}
            >
                Удалить
            </p>
        </div>
    );
};

export default Genre;