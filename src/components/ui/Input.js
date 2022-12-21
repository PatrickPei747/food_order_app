import React from "react";

import styles from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
    return(
        <div className={styles.input}>
            <lable htmkFor={props.input.id}>{props.lable}</lable>
            <input ref={ref} {...props.input} />
        </div>
    );
});

export default Input;