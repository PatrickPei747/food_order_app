import { useRef, useState } from 'react';

import styles from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFourChars = value => value.trim().length === 4;

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        postCode: true,
        city: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();
        
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostCode = postCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostCodeIsValid = isFourChars(enteredPostCode);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postCode: enteredPostCodeIsValid,
            city: enteredCityIsValid
        });

        const formIsValid = 
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredPostCodeIsValid &&
            enteredCityIsValid;

        if (!formIsValid) {
            return;
        }
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postCode: enteredPostCode,
            city: enteredCity
        });
    };

    return (
        <form className={styles.form} onSubmit={confirmHandler}>
            <div className={`${styles.control} ${
                formInputsValidity.name ? '' : styles.invalid
            }`}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={`${styles.control} ${
                formInputsValidity.street ? '' : styles.invalid
            }`}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputsValidity.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={`${styles.control} ${
                formInputsValidity.postCode ? '' : styles.invalid
            }`}>
                <label htmlFor='post'>Post Code</label>
                <input type='text' id='post' ref={postCodeInputRef} />
                {!formInputsValidity.postCode && <p>Please enter a valid post code (4 characters long)!</p>}
            </div>
            <div className={`${styles.control} ${
                formInputsValidity.city ? '' : styles.invalid
            }`}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputsValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={styles.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={styles.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;