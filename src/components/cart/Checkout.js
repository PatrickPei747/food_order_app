import styles from './Checkout.module.css';

const Checkout = props => {
    const confirmHandler = event => {
        event.prevent.Default();
    };

    return (
        <form onSubmit={confirmHandler}>
            <div className={styles.control}>
                <lable htmlFor='name'>Your Name</lable>
                <input type='text' id='name' />
            </div>
            <div className={styles.control}>
                <lable htmlFor='street'>Street</lable>
                <input type='text' id='street' />
            </div>
            <div className={styles.control}>
                <lable htmlFor='post code'>Post Code</lable>
                <input type='text' id='post code' />
            </div>
            <div className={styles.control}>
                <lable htmlFor='city'>City</lable>
                <input type='text' id='city' />
            </div>
            <button type='button' onClick={props.onCancel}>Cancel</button>
            <button>Confirm</button>
        </form>
    );
};

export default Checkout;