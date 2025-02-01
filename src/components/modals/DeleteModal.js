import React from 'react';
import styles from "../../styles/components/DeleteModal.module.css"
import {CSSTransition} from "react-transition-group";

const DeleteModal = ({ visible, setVisible, text, deleteFunc }) => {

    const closeModal = () => {
        setVisible(false)
    }

    return (
        <CSSTransition
            in={visible}
            timeout={580}
            classNames="popup-back"
            mountOnEnter
            unmountOnExit
        >
            <div className={styles.back}>
                <div className={styles.modal}>
                    <p className={styles.text}>{text}</p>
                    <div className={styles.under_line}>
                        <p
                            onClick={deleteFunc}
                            className={styles.btn + ' ' + styles.red}
                        >
                            Удалить
                        </p>
                        <p
                            onClick={closeModal}
                            className={styles.btn + ' ' + styles.blue}
                        >
                            Оставить
                        </p>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};

export default DeleteModal;