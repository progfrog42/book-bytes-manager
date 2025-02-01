import React, {useEffect, useState} from 'react';
import styles_bw from "../../styles/windows/BookWindow.module.css";
import styles from "../../styles/windows/GenreWindow.module.css"
import {deleteGenreById, getAllGenres} from "../../http/api/genre";
import Genre from "../../components/Genre";
import ChangeGenreModal from "../../components/modals/ChangeGenreModal";
import DeleteModal from "../../components/modals/DeleteModal";
import CreateGenreModal from "../../components/modals/CreateGenreModal";
import Cookies from "universal-cookie/es6";

const GenresWindow = () => {

    const cookies = new Cookies()

    const [genres, setGenres] = useState([])
    const [changeId, setChangeId] = useState(-1)

    const [visible, setVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [createVisible, setCreateVisible] = useState(false)

    const token = cookies.get('token') || 'n'
    const id = cookies.get('id') || 'n'

    useEffect(() => {
        if (changeId === -1) {
            getAllGenres().then(data => {
                setGenres(data)
            })
        }
    }, [changeId])

    const deleteGenre = () => {
        if (changeId !== -1) {
            deleteGenreById(changeId, token, id).then(() => {
                setDeleteVisible(false)
                setChangeId(-1)
            })
        }
    }

    const openCreateModal = () => {
        setCreateVisible(true)
    }

    return (
        <>
            <CreateGenreModal
                visible={createVisible}
                setVisible={setCreateVisible}
                genres={genres}
                setGenres={setGenres}
            />
            <DeleteModal
                text="Вы действительно хотите удалить этот жанр?"
                visible={deleteVisible}
                setVisible={setDeleteVisible}
                deleteFunc={deleteGenre}
            />
            <ChangeGenreModal
                visible={visible}
                setVisible={setVisible}
                currentId={changeId}
                setCurrentId={setChangeId}
            />
            <div className={styles_bw.block + ' fd'}>
                <div className={styles_bw.up_line}>
                    <button
                        onClick={openCreateModal}
                        className={styles_bw.btn_add}
                    >
                        Добавить жанр
                    </button>
                </div>
                <div className={styles_bw.list + ' ' + styles.list}>
                    {genres.map(genre =>
                        <Genre
                            genre={genre}
                            setVisibleModal={setVisible}
                            setCurrentId={setChangeId}
                            setVisibleDeleteModal={setDeleteVisible}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default GenresWindow;