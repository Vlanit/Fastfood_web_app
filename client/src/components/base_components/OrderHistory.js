import {useState, useEffect} from 'react';
import { observer } from 'mobx-react-lite';

import instance from '../../api/server_api';
import DishCard from './DishCard';
import Button from './Button';
import LinkImage from './LinkImage';
import OrderCard from './OrderCard';

import { interface_styles, interface_colors, button, button_hover } from '../../styles/ColorData';

import { main_page_store } from '../../state/MainPageDataState';
import { shopping_cart_store } from '../../state/ShoppingCartState';
import { franchise_data_store } from '../../state/FranchiseDataState';
import { user_data_store } from '../../state/UserDataState';

const OrderHistory = observer((props) => {
    const [current_order, setOrder] = useState(-1);
    const size_array = ['Малая (25 см)', 'Средняя (30 см)', 'Большая (35 см)'];
    const dishes_menu = main_page_store.dishes;
    const products_menu = main_page_store.products;
    const orders = user_data_store.orders;

    console.log(orders);

    return (
        <div style={{...interface_styles.shopping_cart, ...interface_styles.modal_window, backgroundColor: interface_colors.background_color}}>
            <div style={interface_styles.cart_items}>
                <h2 style={{...interface_styles.h2, color: interface_colors.h2_color}}>Состав заказа</h2>
                <div style={interface_styles.cart_items_div}>
                    <div style={interface_styles.cart_items_table}>
                        { current_order != -1 ?
                                orders[current_order].dishes?.map(item => {
                                    if (item.id != null) {
                                        const arr_index = main_page_store.get_dish_array_index(item.id);
                                        return <DishCard mini={true} id={arr_index} name={dishes_menu[arr_index].name} 
                                            image_path={dishes_menu[arr_index].image_path}
                                            price={dishes_menu[arr_index].price}
                                            type={'dish'} 
                                            count={item.count} size={size_array[item.size - 1]} 
                                            can_interact={false}/>
                                    }}):
                                    null
                                }
                        { current_order != -1 ?
                                orders[current_order].products?.map(item => {
                                    if (item.id != null) {
                                        const arr_index = main_page_store.get_product_array_index(item.id);
                                        return <DishCard mini={true} id={arr_index} name={products_menu[arr_index].name} 
                                            image_path={products_menu[arr_index].image_path} 
                                            price={products_menu[arr_index].price}
                                            type={'product'} 
                                            count={item.count} 
                                            can_interact={false}/>
                                    }}):
                                    null
                                }
                    </div>
                </div>
            </div>
            <div style={{...interface_styles.order_form, backgroundColor: interface_colors.secondary_background_color}}>
                {
                    user_data_store.orders !== undefined ? 
                        user_data_store.orders.map((item, index) => 
                            <OrderCard 
                                button_action={() => {setOrder(index)}}
                                id={item.order_id} 
                                delivery={item.delivery} 
                                address={item.delivery_address}
                                datetime={item.order_datetime}
                                button_name={"Просмотр"}/>
                        ):
                        null
                }
                <LinkImage image_name={"ExitButton.svg"} main_style={interface_styles.exit_button} 
                    hover_style={{...interface_styles.exit_button, backgroundColor: interface_colors.a_color_hover}}
                    onClick={() => props.exit_action()}/>
            </div>
        </div>
    )
});

export default OrderHistory;