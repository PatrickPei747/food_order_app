import React, { useContext, useState } from "react";

import Modal from "../ui/Modal";
import CartContext from "../../store/cart-context";
import CartItem from './CartItem';
import Checkout from "./Checkout";
import styles from './Cart.module.css';

const Cart = (props) => {
    const [isCheckOut, setIsCheckOut] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const orderHandler = () => {
        setIsCheckOut(true);
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://food-order-a7fd8-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const cartItems = <ul className={styles['cart-items']}>
        {cartCtx.items.map((item) => (
            <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
            />
        ))}
    </ul>

    const modalActions = <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && (
            <button className={styles.button} onClick={orderHandler}>
                Order
            </button>
        )}
    </div>

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount: </span>
                <span>{totalAmount}</span>
            </div>
            {isCheckOut && (
                <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
            )}
            {!isCheckOut && modalActions}
        </React.Fragment>
    );

    const isSubmittingContent = <p>Submitting Order...</p>
    const didSubmitContent = (
        <React.Fragment>
            <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={props.onClose}>Close</button>
            </div>
            <p>Order Received!</p>
        </React.Fragment>
    );

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingContent}
            {!isSubmitting && didSubmit && didSubmitContent}
        </Modal>
    );
};

export default Cart;