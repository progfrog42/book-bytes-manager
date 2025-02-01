import React, {useEffect, useState} from 'react';
import styles from "../../styles/components/ChangeGenreModal.module.css"
import styles_m from "../../styles/components/DeleteModal.module.css"
import {CSSTransition} from "react-transition-group";
import {createGenre, getAllGenres} from "../../http/api/genre";
import Cookies from "universal-cookie/es6";

const ChangeGenreModal = ({ visible, setVisible, genres, setGenres }) => {

    const cookies = new Cookies()

    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState('')

    useEffect(() => {
        setErrorText("")
        setError(false)
    }, [name])

    const closeModal = () => {
        setVisible(false)
    }

    const create = () => {
        if (name.length < 4) {
            setErrorText("Название минимум 4 символа")
            setError(true)
            return
        }
        if (name.length > 30) {
            setErrorText("Название максимум 30 символов")
            setError(true)
            return
        }
        if (genres.find(el => el.name === name)) {
            setErrorText("Жанр с таким названием уже существует")
            setError(true)
            return
        }
        const token = cookies.get('token') || 'n'
        const id = cookies.get('id') || 'n'
        createGenre(name, token, id).then(() => {
            getAllGenres().then(data => {
                setGenres(data)
                setName("")
                setErrorText("")
                setError(false)
                closeModal()
            })
        })
    }

    return (
        <CSSTransition
            in={visible}
            timeout={580}
            classNames="popup-back"
            mountOnEnter
            unmountOnExit
        >
            <div className={styles_m.back}>
                <div className={styles_m.modal}>
                    <p className={styles_m.text}>
                        Введите название
                    </p>
                    <input
                        className={styles.input}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введите текст"
                    />
                    <p
                        style={{display: error ? "block" : "none"}}
                        className={styles.err + ' fd'}
                    >
                        {errorText}
                    </p>
                    <div className={styles_m.under_line}>
                        <p
                            onClick={closeModal}
                            className={styles_m.btn + ' ' + styles_m.red}
                        >
                            Отмена
                        </p>
                        <p
                            onClick={create}
                            className={styles_m.btn + ' ' + styles_m.blue}
                        >
                            Создать
                        </p>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};

export default ChangeGenreModal;