import React from 'react';
import styles from "../styles/components/Input.module.css"

const Input = ({ value, onChange, styleWrap = "", styleInput = "", placeholder, type = "text" }) => {
    return (
        <div className={styles.wrapper + ' ' + styleWrap}>
            <input
                className={styles.input + ' ' + styleInput}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Input;