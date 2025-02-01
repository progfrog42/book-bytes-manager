import React, {useState} from 'react';
import styles from "../styles/pages/signin.module.css"
import HeightWrapper from "../components/HeightWrapper";
import Input from "../components/Input";
import Button from "../components/Button";
import {authAdmin, sendDataOnEmail} from "../http/api/auth";
import Cookies from "universal-cookie/es6";
import {useNavigate} from "react-router-dom";
import {PANEL_ROUTE} from "../utils/consts";

const SignIn = () => {

    const cookie = new Cookies()
    const navigate = new useNavigate()

    const [token, setToken] = useState('')
    const [id, setId] = useState('')

    const [loadingData, setLoadingData] = useState(false)
    const [loadingIn, setLoadingIn] = useState(false)

    const updateToken = (value) => {
        setToken(value)
    }

    const updateId = (value) => {
        setId(value)
    }

    const sendData = () => {
        setLoadingData(true)
        sendDataOnEmail().then(() => {
            setLoadingData(false)
        })
    }

    const signIn = () => {
        if (token && id) {
            setLoadingIn(true)
            authAdmin(token, id).then(data => {
                setLoadingIn(false)
                if (data) {
                    cookie.set('token', token, { path: '/' })
                    cookie.set('id', id, { path: '/' })
                    navigate(PANEL_ROUTE + '1')
                }
            })
        }
    }

    return (
        <HeightWrapper>
            <div className={styles.wrapper}>
                <div className={styles.block}>
                    <p className={styles.text}>Вход</p>
                    <Input
                        placeholder="Token"
                        value={token}
                        onChange={(value) => updateToken(value)}
                    />
                    <Input
                        placeholder="ID"
                        value={id}
                        onChange={(value) => updateId(value)}
                    />
                    <Button
                        onClick={sendData}
                        styleWrap={styles.btn_mt}
                        text="Получить"
                        loading={loadingData}
                    />
                    <Button
                        onClick={signIn}
                        styleWrap={styles.btn_mt}
                        text="Войти"
                        loading={loadingIn}
                    />
                </div>
            </div>
        </HeightWrapper>
    );
};

export default SignIn;