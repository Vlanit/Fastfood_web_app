import {useState} from 'react';
import { observer } from 'mobx-react-lite';

import CashierOrderCard from "../base_components/CashierOrderCard";
import DishCard from '../base_components/DishCard';

import { main_page_store } from '../../state/MainPageDataState';
import { user_data_store } from '../../state/UserDataState';

import { interface_colors, interface_styles } from '../../styles/ColorData';

const CashierPage = observer((props) => {
    const size_array = ['Малая (25 см)', 'Средняя (30 см)', 'Большая (35 см)'];
    const [current_order, setOrder] = useState(-1);

    const orders = user_data_store.orders;
    const dishes_menu = main_page_store.dishes;
    const products_menu = main_page_store.products;

    const getStateName = (order) => {
        if (!order.isstarted) {
            return "Принять";
        }
        if (order.isstarted && !order.iscooked) {
            return "Приготовлено";
        }
        if (order.iscooked && !order.isfinished) {
            return "Завершить";
        }
        return "";  
    };

    if (user_data_store.orders[current_order]?.isfinished) {
        setOrder(-1);
    }

    return (
        <div style={interface_styles.flex_between}>
            <div style={interface_styles.order_contents}>
                {orders.map((item, index) => {
                    if (!item.isfinished)
                        return <CashierOrderCard first_action={() => user_data_store.changeOrderStatus(index)} second_action={() => {setOrder(index)}}
                            id={item.order_id} name={item.name} surname={item.surname} delivery={item.delivery} address={item.delivery_address}
                            datetime={item.order_datetime} first_button_name={getStateName(orders[index])} second_button_name={"Просмотр"}/>
                })}
            </div>
            <div style={{...interface_styles.order_contents, backgroundColor: interface_colors.secondary_background_color}}>
                {current_order != -1 ? 
                    <h1>{`Заказ №${orders[current_order].order_id}`}</h1> : 
                null}
                <div style={interface_styles.cart_items_table}>
                    {orders[current_order] !== undefined ?
                    orders[current_order].dishes.map(item => (
                        <DishCard mini={true} name={dishes_menu[item.id].name} image_path={dishes_menu[item.id].image_path} 
                            description={dishes_menu[item.id].description} price={dishes_menu[item.id].price}
                            count={item.count} size={size_array[item.size - 1]} can_interact={false}/>
                    )):null}
                    {orders[current_order] !== undefined ?
                    orders[current_order].products.map(item => (
                        <DishCard mini={true} name={products_menu[item.id].name} image_path={products_menu[item.id].image_path}
                            description={products_menu[item.id].description} price={products_menu[item.id].price}
                            count={item.count} can_interact={false}/>
                    )):null}
                </div>
            </div>
            <p style={interface_styles.exit_button}>{user_data_store._outlet}</p>
        </div>
    )
});

export default CashierPage;