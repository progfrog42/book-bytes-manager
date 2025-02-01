import React, {useEffect, useState} from 'react';
import styles from "../styles/components/Wrapper.module.css"
import Cookies from "universal-cookie/es6";
import {useNavigate} from "react-router-dom";
import {authAdmin} from "../http/api/auth";
import {SIGNIN_ROUTE} from "../utils/consts";

const Wrapper = ({ children }) => {

    const cookies = new Cookies();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        const token = cookies.get('token') || 'n'
        const id = cookies.get('id') || 'n'
        authAdmin(token, id).then(data => {
            setLoading(false)
            setAuth(data)
        })
    }, [])

    useEffect(() => {
        if (!loading) {
            if (!auth) {
                navigate(SIGNIN_ROUTE)
            }
        }
    }, [loading])

    if (loading) {
        return (
            <div className={styles.block}>
                <svg
                    className={styles.svg}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                >
                    <path d="M480.297-61.174q-88.196 0-164.577-32.042-76.38-32.043-133.421-89.083-57.04-57.041-89.083-133.37-32.042-76.329-32.042-164.8 0-88.307 32.036-164.16 32.036-75.852 88.991-133.053 56.954-57.2 133.198-89.455Q391.643-899.391 480-899.391q16.671 0 29.379 12.765 12.708 12.765 12.708 29.252t-12.708 29.105Q496.671-815.652 480-815.652q-140.125 0-237.888 97.774-97.764 97.774-97.764 237.913t97.774 237.878q97.774 97.739 237.913 97.739t237.878-97.764Q815.652-339.875 815.652-480q0-16.671 12.617-29.379 12.618-12.708 29.105-12.708 16.487 0 29.252 12.708T899.391-480q0 88.357-32.29 164.607-32.291 76.251-89.348 133.235-57.057 56.984-133.204 88.984-76.146 32-164.252 32Z"/>
                </svg>
            </div>
        )
    }

    return (
        <>
            {children}
        </>
    );
};

export default Wrapper;