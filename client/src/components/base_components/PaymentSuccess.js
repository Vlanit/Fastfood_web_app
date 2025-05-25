import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { shopping_cart_store } from "../../state/ShoppingCartState";

function PaymentSuccess(props) {
    let location = useLocation();

    useEffect(() => {
        shopping_cart_store.getDataFromSessionStorage();
        shopping_cart_store.makeOrder();
    }, []);

    return (
        <Navigate to='/' state={{from: location}} replace/>
    )
}

export default PaymentSuccess;