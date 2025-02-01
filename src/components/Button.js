import React from 'react';
import styles from "../styles/components/Button.module.css"

const Button = ({ text, styleWrap = "", styleBtn = "", loading, onClick }) => {
    return (
        <div className={styles.wrapper + ' ' + styleWrap}>
            {loading ?
                <svg
                    className={styles.svg + ' fd'}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                >
                    <path d="M480.297-61.174q-88.196 0-164.577-32.042-76.38-32.043-133.421-89.083-57.04-57.041-89.083-133.37-32.042-76.329-32.042-164.8 0-88.307 32.036-164.16 32.036-75.852 88.991-133.053 56.954-57.2 133.198-89.455Q391.643-899.391 480-899.391q16.671 0 29.379 12.765 12.708 12.765 12.708 29.252t-12.708 29.105Q496.671-815.652 480-815.652q-140.125 0-237.888 97.774-97.764 97.774-97.764 237.913t97.774 237.878q97.774 97.739 237.913 97.739t237.878-97.764Q815.652-339.875 815.652-480q0-16.671 12.617-29.379 12.618-12.708 29.105-12.708 16.487 0 29.252 12.708T899.391-480q0 88.357-32.29 164.607-32.291 76.251-89.348 133.235-57.057 56.984-133.204 88.984-76.146 32-164.252 32Z"/>
                </svg>
                :
                <button
                    onClick={onClick}
                    className={styles.button + ' fd ' + styleBtn}
                >
                    {text}
                </button>
            }
        </div>
    );
};

export default Button;