import React, {useState} from 'react';
import styles from "../styles/pages/create-book.module.css"
import HeightWrapper from "../components/HeightWrapper";
import Grid from "../components/Grid";
import Input from "../components/Input";
import {Col} from "react-bootstrap";
import {createBook} from "../http/api/book";
import {useNavigate} from "react-router-dom";
import {PANEL_ROUTE} from "../utils/consts";
import MessageModal from "../components/modals/MessageModal";
import Cookies from "universal-cookie/es6";

const CreateBook = () => {

    const cookies = new Cookies()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(100)
    const [discountPrice, setDiscountPrice] = useState(-1)
    const [description, setDescription] = useState('')
    const [beginningBook, setBeginningBook] = useState('')
    const [visibility, setVisibility] = useState(true)
    const [fileEpub, setFileEpub] = useState(null)
    const [filePdf, setFilePdf] = useState(null)
    const [fileImage, setFileImage] = useState(null)

    const [messageText, setMessageText] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    const addBook = () => {
        const token = cookies.get('token') || 'n'
        const id = cookies.get('id') || 'n'
        if (name && price >= 50 && discountPrice >= -1 && beginningBook && description
            && fileEpub && filePdf && fileImage) {
            const formData = new FormData()
            formData.append('name', `${name}`)
            formData.append('price', `${price}`)
            formData.append('discount_price', `${discountPrice}`)
            formData.append('beginning_book', `${beginningBook}`)
            formData.append('description', `${description}`)
            formData.append('visibility', `${visibility}`)
            formData.append('file_pdf', filePdf)
            formData.append('file_epub', fileEpub)
            formData.append('image', fileImage)
            createBook(formData, token, id).then(() => {
                navigate(PANEL_ROUTE + '1')
            })
        } else {
            setMessageText("Ошибка: одно или несколько полей не заполнены или имеют недопустимые значения")
            setModalVisible(true)
        }
    }

    return (
        <HeightWrapper>
            <MessageModal text={messageText} visible={modalVisible} setVisible={setModalVisible} />
            <Grid>
                <div className={styles.input_mt}/>
                <Col xxl={6} xl={6}>
                    <Input
                        styleWrap={styles.mt0}
                        value={name}
                        onChange={setName}
                        placeholder="Название книги"
                    />
                    <Input
                        styleWrap={styles.input_mt}
                        value={price}
                        onChange={setPrice}
                        placeholder="Цена, ₽"
                        type="number"
                    />
                    <Input
                        styleWrap={styles.input_mt}
                        value={discountPrice}
                        onChange={setDiscountPrice}
                        placeholder="Цена со скидкой, ₽"
                        type="number"
                    />
                    <div className={styles.input_mt + ' ' + styles.btn_line}>
                        <input
                            name="visibility"
                            type="radio"
                            checked={visibility}
                            onChange={() => setVisibility(true)}
                        />
                        <p className={styles.rnd_p}>Видимая</p>
                        <input
                            className={styles.rnd_mr}
                            name="visibility"
                            type="radio"
                            checked={!visibility}
                            onChange={() => setVisibility(false)}
                        />
                        <p className={styles.rnd_p}>Невидимая</p>
                    </div>
                    <div
                        style={{flexDirection: "column", alignItems: "flex-start"}}
                        className={styles.input_mt + ' ' + styles.btn_line}
                    >
                        <p className={styles.file_p}>Выберете файл книги .epub</p>
                        <input
                            onChange={(e) => setFileEpub(e.target.files[0])}
                            type="file"
                        />
                    </div>
                    <div
                        style={{flexDirection: "column", alignItems: "flex-start"}}
                        className={styles.input_mt + ' ' + styles.btn_line}
                    >
                        <p className={styles.file_p}>Выберете файл книги .pdf</p>
                        <input
                            onChange={(e) => setFilePdf(e.target.files[0])}
                            type="file"
                        />
                    </div>
                    <div
                        style={{flexDirection: "column", alignItems: "flex-start"}}
                        className={styles.input_mt + ' ' + styles.btn_line}
                    >
                        <p className={styles.file_p}>Выберете обложку книги .jpg, .png или .webp</p>
                        <input
                            onChange={(e) => setFileImage(e.target.files[0])}
                            type="file"
                        />
                    </div>
                </Col>
                <Col
                    className={styles.right_block}
                    xxl={6} xl={6}
                >
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles.textarea}
                        placeholder="Описание книги"
                    />
                    <p className={styles.count + ' ' + (description.length > 320 ? styles.err : '')}>
                        {description.length} / 320
                    </p>
                    <div className={styles.input_mt}/>
                    <textarea
                        value={beginningBook}
                        onChange={(e) => setBeginningBook(e.target.value)}
                        className={styles.textarea}
                        placeholder="Начало книги"
                    />
                    <p className={styles.count + ' ' + (beginningBook.length > 420 ? styles.err : '')}>
                        {beginningBook.length} / 420
                    </p>
                    <button
                        className={styles.add_book}
                        onClick={addBook}
                    >
                        Добавить книгу
                    </button>
                </Col>
            </Grid>
        </HeightWrapper>
    );
};

export default CreateBook;