import React, {useEffect} from 'react';
import MessageModal from "../components/modals/MessageModal";
import Grid from "../components/Grid";
import styles_crt from "../styles/pages/create-book.module.css";
import styles from "../styles/pages/change-book.module.css"
import {Col} from "react-bootstrap";
import Input from "../components/Input";
import HeightWrapper from "../components/HeightWrapper";
import {useState} from "react";
import {useParams} from "react-router-dom";
import {changeBook, downloadBook, getBookByToken} from "../http/api/book";
import {getAllGenres, getAllGenresByBookId} from "../http/api/genre";
import Cookies from "universal-cookie/es6";

const ChangeBook = () => {

    const cookies = new Cookies()

    const {token} = useParams()

    const [book, setBook] = useState(null)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [discountPrice, setDiscountPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [beginningBook, setBeginningBook] = useState('')
    const [visibility, setVisibility] = useState(true)
    const [fileEpub, setFileEpub] = useState(null)
    const [filePdf, setFilePdf] = useState(null)
    const [fileImage, setFileImage] = useState(null)
    const [genres, setGenres] = useState([])

    const [allGenres, setAllGenres] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {

        getBookByToken(token).then(book => {
            setBook(book)
            setName(book.name)
            setPrice(book.price)
            setDiscountPrice(book.discount_price)
            setDescription(book.description)
            setBeginningBook(book.beginning_book)
            setVisibility(book.visibility)
            getAllGenres().then(data => {
                setAllGenres(data)
                getAllGenresByBookId(book.id).then(data => {
                    const array = []
                    data.forEach(genre => {
                        array.push(genre.id)
                    })
                    setGenres(array)
                    setLoading(false)
                })
            })
        })
    }, [])

    const saveBook = () => {
        const formData = new FormData()

        const token = cookies.get('token') || 'n'
        const id = cookies.get('id') || 'n'

        formData.append('id', `${book.id}`)
        formData.append('name', `${name}`)
        formData.append('price', `${price}`)
        formData.append('discount_price', `${discountPrice}`)
        formData.append('description', `${description}`)
        formData.append('beginning_book', `${beginningBook}`)
        formData.append('visibility', `${visibility}`)
        formData.append('genreIds', `${JSON.stringify(genres)}`)
        formData.append('file_pdf', filePdf)
        formData.append('file_epub', fileEpub)
        formData.append('image', fileImage)

        changeBook(formData, token, id).then(book => {
            setBook(book)
            setName(book.name)
            setPrice(book.price)
            setDiscountPrice(book.discount_price)
            setDescription(book.description)
            setBeginningBook(book.beginning_book)
            setVisibility(book.visibility)
            getAllGenresByBookId(book.id).then(data => {
                const array = []
                data.forEach(genre => {
                    array.push(genre.id)
                })
                setGenres(array)
            })
        })
    }

    const changeGenres = (id) => {
        if (genres.includes(id)) {
            setGenres(genres.filter(el => el !== id))
        } else {
            setGenres([...genres, id])
        }
    }

    const downloadPdf = () => {
        downloadBook(book.file, ".pdf").then(data => {
            const url = URL.createObjectURL(data)
            const link = document.createElement('a')
            link.href = url
            link.download = book.name
            document.body.appendChild(link)
            link.click()
            link.remove()
        })
    }

    const downloadEpub = () => {
        downloadBook(book.file, ".epub").then(data => {
            const url = URL.createObjectURL(data)
            const link = document.createElement('a')
            link.href = url
            link.download = book.name
            document.body.appendChild(link)
            link.click()
            link.remove()
        })
    }

    if (loading) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <HeightWrapper>

            <Grid>
                <div className={styles_crt.input_mt}/>
                <Col xxl={6} xl={6}>
                    <Input
                        styleWrap={styles_crt.mt0}
                        value={name}
                        onChange={setName}
                        placeholder="Название книги"
                    />
                    <Input
                        styleWrap={styles_crt.input_mt}
                        value={price}
                        onChange={setPrice}
                        placeholder="Цена, ₽"
                        type="number"
                    />
                    <Input
                        styleWrap={styles_crt.input_mt}
                        value={discountPrice}
                        onChange={setDiscountPrice}
                        placeholder="Цена со скидкой, ₽"
                        type="number"
                    />
                    <div className={styles_crt.input_mt + ' ' + styles_crt.btn_line}>
                        <input
                            name="visibility"
                            type="radio"
                            checked={visibility}
                            onChange={() => setVisibility(true)}
                        />
                        <p className={styles_crt.rnd_p}>Видимая</p>
                        <input
                            className={styles_crt.rnd_mr}
                            name="visibility"
                            type="radio"
                            checked={!visibility}
                            onChange={() => setVisibility(false)}
                        />
                        <p className={styles_crt.rnd_p}>Невидимая</p>
                    </div>
                    <div
                        style={{flexDirection: "column", alignItems: "flex-start"}}
                        className={styles_crt.input_mt + ' ' + styles_crt.btn_line}
                    >
                        <p className={styles_crt.file_p}>Выберете файл книги .epub</p>
                        <input
                            onChange={(e) => setFileEpub(e.target.files[0])}
                            type="file"
                        />
                        <p
                            onClick={downloadEpub}
                            className={styles.download}
                        >
                            Скачать текущий файл
                        </p>
                    </div>
                    <div
                        style={{flexDirection: "column", alignItems: "flex-start"}}
                        className={styles_crt.input_mt + ' ' + styles_crt.btn_line}
                    >
                        <p className={styles_crt.file_p}>Выберете файл книги .pdf</p>
                        <input
                            onChange={(e) => setFilePdf(e.target.files[0])}
                            type="file"
                        />
                        <p
                            onClick={downloadPdf}
                            className={styles.download}
                        >
                            Скачать текущий файл
                        </p>
                    </div>
                    <div
                        style={{flexDirection: "column", alignItems: "flex-start"}}
                        className={styles_crt.input_mt + ' ' + styles_crt.btn_line}
                    >
                        <p className={styles_crt.file_p}>Выберете обложку книги .jpg, .png или .webp</p>
                        <input
                            onChange={(e) => setFileImage(e.target.files[0])}
                            type="file"
                        />
                        <img
                            src={process.env.REACT_APP_API_URL + 'image/' + book.image}
                            alt="book image"
                            className={styles.image}
                        />
                    </div>
                </Col>
                <Col
                    className={styles_crt.right_block}
                    xxl={6} xl={6}
                >
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles_crt.textarea}
                        placeholder="Описание книги"
                    />
                    <p className={styles_crt.count + ' ' + (description.length > 320 ? styles_crt.err : '')}>
                        {description.length} / 320
                    </p>
                    <div className={styles_crt.input_mt}/>
                    <textarea
                        value={beginningBook}
                        onChange={(e) => setBeginningBook(e.target.value)}
                        className={styles_crt.textarea}
                        placeholder="Начало книги"
                    />
                    <p className={styles_crt.count + ' ' + (beginningBook.length > 420 ? styles_crt.err : '')}>
                        {beginningBook.length} / 420
                    </p>
                    <p className={styles_crt.count + ' ' + styles_crt.input_mt}>Жанры</p>
                    <div className={styles.genres}>
                        {allGenres.map(genre =>
                            <p
                                onClick={() => changeGenres(genre.id)}
                                className={styles.genre + ' ' + (genres.includes(genre.id) && styles.current)}
                            >
                                {genre.name}
                            </p>
                        )}
                    </div>
                    <button
                        className={styles_crt.add_book}
                        onClick={saveBook}
                    >
                        Сохранить
                    </button>
                </Col>
            </Grid>
        </HeightWrapper>
    );
};

export default ChangeBook;