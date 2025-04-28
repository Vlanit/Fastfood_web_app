import {useState, useEffect} from 'react';
import { observer } from 'mobx-react-lite';

import instance from '../../api/server_api';
import DishCard from './DishCard';
import Button from './Button';
import LinkImage from './LinkImage';

import { interface_styles, interface_colors } from '../../styles/ColorData';

import { main_page_store } from '../../state/MainPageDataState';
import { shopping_cart_store } from '../../state/ShoppingCartState';
import { franchise_data_store } from '../../state/FranchiseDataState';

const ShoppingCart = observer((props) => {
    console.log(shopping_cart_store.dishes, shopping_cart_store.products);
    const size_array = ['Малая (25 см)', 'Средняя (30 см)', 'Большая (35 см)'];
    const order_dishes = shopping_cart_store.dish_array;
    const dishes_menu = main_page_store.dishes;
    const order_products = shopping_cart_store.product_array;
    const products_menu = main_page_store.products;

    const buttonStyle = {...interface_styles.button, color: interface_colors.button_text_color, backgroundColor: interface_colors.button_color};
    const buttonHoverStyle = {...interface_styles.button, color: interface_colors.button_text_color_hover, backgroundColor: interface_colors.button_color_hover};

    if (shopping_cart_store.town == "") {
        shopping_cart_store.town = franchise_data_store.towns[0].town;
        franchise_data_store.outlets.map(item =>
            {if (shopping_cart_store.town==item.town && shopping_cart_store.outlet == -1) {
                shopping_cart_store.outlet = item.outlet_id;
            }
        });
    }

    const insertOrder = async () => {
        shopping_cart_store.makeOrder();
    };

    const getStateName = () => {
        if (!shopping_cart_store.isstarted) {
            return "В обработке";
        }
        if (shopping_cart_store.isstarted && !shopping_cart_store.iscooked) {
            return "Готовится";
        }
        if (shopping_cart_store.iscooked && !shopping_cart_store.isfinished) {
            if (shopping_cart_store.delivery) {
                return "В пути";
            }
            else {
                return "Ожидает в заведении";
            }
        }
        return "";  
    };

    return (
        <div style={{...interface_styles.shopping_cart, ...interface_styles.modal_window, backgroundColor: interface_colors.background_color}}>
            <div style={interface_styles.cart_items}>
                <h2 style={{...interface_styles.h2, color: interface_colors.h2_color}}>Корзина</h2>
                <div style={interface_styles.cart_items_div}>
                    <div style={interface_styles.cart_items_table}>
                        {order_dishes.keys().map(item => (
                            <DishCard mini={true} id={item} name={dishes_menu[item].name} 
                            image_path={dishes_menu[item].image_path} discount={dishes_menu[item].discount} price={dishes_menu[item].price}
                            type={'dish'} 
                            count={order_dishes.get(item).count} size={size_array[order_dishes.get(item).size - 1]} 
                            can_interact={!shopping_cart_store.isordered}/>
                        ))}
                        {order_products.keys().map(item => (
                            <DishCard mini={true} id={item} name={products_menu[item].name} 
                            image_path={products_menu[item].image_path} discount={products_menu[item].discount} price={products_menu[item].price}
                            type={'product'} 
                            count={order_products.get(item)} 
                            can_interact={!shopping_cart_store.isordered}/>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{...interface_styles.order_form, backgroundColor: interface_colors.secondary_background_color}}>
                <div style={interface_styles.order_form_table}>
                    <label style={interface_styles.p}>Имя: </label>
                    {shopping_cart_store.isordered ? 
                        <p>{shopping_cart_store.name}</p>:
                        <input style={{...interface_styles.input, borderColor: interface_colors.input_border_color}} 
                            type="text" id="name" name="name" onChange={(event) => shopping_cart_store.name = event.target.value}/>
                            }
                    <label style={interface_styles.p}>Фамилия: </label>
                    {shopping_cart_store.isordered ? 
                        <p>{shopping_cart_store.surname}</p>:
                        <input style={{...interface_styles.input, borderColor: interface_colors.input_border_color}} 
                            type="text" id="surname" name="surname" onChange={(event) => shopping_cart_store.surname = event.target.value}/>
                            }
                    <label style={interface_styles.p}>Город: </label>
                    {shopping_cart_store.isordered ? 
                        <p>{shopping_cart_store.town}</p>:
                        <select style={{...interface_styles.select, borderColor: interface_colors.select_border_color}} 
                            id="town" name="town" onChange={(event) => shopping_cart_store.town = event.target.value}>
                                {franchise_data_store.towns.map(item => (
                                    <option value={item.town}>{item.town}</option>
                                ))}
                            </select>
                            }
                    <label style={interface_styles.p}>Доставка: </label>
                    {shopping_cart_store.isordered ? 
                        <p>{shopping_cart_store.delivery == "1" ? "Самовывоз" : "Доставка"}</p>:
                        <select style={{...interface_styles.select, borderColor: interface_colors.select_border_color}}     
                            id="delivery" name="delivery" 
                                onChange={(event) => shopping_cart_store.delivery = event.target.value==1?false:true}>
                                <option value="1">Самовывоз</option>
                                <option value="2">Доставка</option>
                            </select>
                            }
                    {shopping_cart_store.delivery ?
                        <label style={interface_styles.p}>Адрес: </label>
                        :null
                        }
                    {shopping_cart_store.delivery ?
                        (shopping_cart_store.isordered ? 
                            <p>{shopping_cart_store.delivery_address}</p>:
                            <input style={{...interface_styles.input, borderColor: interface_colors.input_border_color}} 
                                type="text" id="address" name="address" 
                                onChange={(event) => shopping_cart_store.delivery_address = event.target.value}/>
                            )
                        :null
                        }
                    <label style={interface_styles.p}>Заведение: </label>
                    {shopping_cart_store.isordered ? 
                        <p>{shopping_cart_store.outlet}</p>:
                        <select style={{...interface_styles.select, borderColor: interface_colors.select_border_color}} 
                            id="outlet" name="outlet" onChange={(event) => shopping_cart_store.outlet = event.target.value}>
                            {
                                franchise_data_store.outlets.map(item =>
                                    {
                                        if (shopping_cart_store.town==item.town) {
                                            return <option value={item.outlet_id}>{item.address}</option>
                                    }
                                }
                                )
                            }
                        </select>
                        }
                </div>
                {shopping_cart_store.isordered ? 
                    <div style={interface_styles.flex_between}>
                        <p style={{...interface_styles.p, ...interface_styles.bold}}>{`Цена: ${shopping_cart_store.price} ₽`}</p>
                        <p style={{...interface_styles.p, ...interface_styles.bold}}>{`Состояние: ${getStateName()}`}</p>
                    </div>:
                    <div style={interface_styles.flex_between}>
                        <Button text={"Оплатить баллами"} main_style={buttonStyle} hover_style={buttonHoverStyle}/>
                        <p style={{...interface_styles.p, ...interface_styles.bold}}>{`Цена: ${shopping_cart_store.price} ₽`}</p>
                        <Button text={"Перейти к оплате"} main_style={buttonStyle} hover_style={buttonHoverStyle} onClick={() => insertOrder()}/>
                    </div>
                    }
                <LinkImage image_name={"ExitButton.svg"} main_style={interface_styles.exit_button} 
                    hover_style={{...interface_styles.exit_button, backgroundColor: interface_colors.a_color_hover}}
                    onClick={() => props.exit_action()}/>
            </div>
        </div>
    )
});

export default ShoppingCart;