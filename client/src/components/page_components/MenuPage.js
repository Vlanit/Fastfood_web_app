import {useState, useEffect} from 'react';
import { observer } from 'mobx-react-lite';

import { interface_colors, interface_styles } from '../../styles/ColorData.js';
import DishCard from '../base_components/DishCard.js';
import DishConstructorCard from '../base_components/DishConstructorCard.js';
import Link from '../base_components/Link';

import { main_page_store } from '../../state/MainPageDataState';
import { shopping_cart_store } from '../../state/ShoppingCartState.js';

const MenuPage = observer((props) => {
    const [type_of_product, setType] = useState(-1);
    const [price, setPrice] = useState('0');
    const [search, setSearch] = useState('');

    const table_style = { ...interface_styles.section, marginTop: 0, ...interface_styles.dish_card_list, ...interface_styles.card_grid_three};

    function cardAction(type, id, data) {
        props.darken(true);
        props.card_action({
            id: id,
            name: data.name, 
            image_path: data.image_path, 
            description: data.description, 
            price: Math.round(data.price - data.price * data.discount / 100),
            dish: type=='dish', 
            product: type=='product'});
        props.info(true);
    }

    function applyPrice(type_price, price, discount) {
        const d_price = Math.round(price - price * discount / 100);
        switch (type_price) {
            case '1':
                return d_price < 400;
            case '2':
                return d_price >= 400 && d_price <= 600;
            case '3':
                return d_price > 600;
            default:
                return true;
        }
    }

    const dish_menu = main_page_store.dishes?.map((item, index) => (
        (item.name.includes(search) || item.description.includes(search)) &&
        (applyPrice(price, item.price, item.discount)) ? 
        <DishCard mini={false} id={index} name={item.name} description={item.description} image_path={item.image_path} 
            discount={item.discount} price={item.price} discount_end_date={item.discount_end_date} 
            count={shopping_cart_store.dish_array.get(index.toString())?.count}
            type={'dish'}
            button_action={() => cardAction('dish', index, item)} can_interact={true}/>:null
        )
    );

    const product_menu = main_page_store.products?.map((item, index) => (
        (item.name.includes(search) || item.description.includes(search)) && 
        (applyPrice(price, item.price, item.discount)) &&
        (item.type==type_of_product || type_of_product == -1)?
        <DishCard mini={false} id={index} name={item.name} description={item.description} image_path={item.image_path} 
            discount={item.discount} price={item.price} discount_end_date={item.discount_end_date} 
            count={shopping_cart_store.product_array.get(index.toString())?.count}
            type={'product'}
            button_action={() => cardAction('product', index, item)} can_interact={true}/>:null
        )
    );

    const tab_render = (type) => {
        switch (type) {
            case -1:
                return (
                    <div style = {table_style}>
                        {dish_menu}
                        {product_menu}
                    </div>
                )
            case 0:
                return (
                    <div style = {table_style}>
                        {dish_menu}
                    </div>
                )
            default:
                return (
                    <div style = {table_style}>
                        {product_menu}
                    </div>
                )
        }
    }

    return (
        <div style={interface_styles.section}>
            <form style={interface_styles.form_panel}>
                <input style={interface_styles.input} type="text" id="search" name="search" placeholder="Поиск"
                    onChange={(event) => setSearch(event.target.value)}/>
                <select style={interface_styles.select} id="price" name="price" value={price} 
                    onChange={(event) => setPrice(event.target.value)}>
                    <option value={0}>Цена</option>
                    <option value={1}>менее 400 ₽</option>
                    <option value={2}>400 ₽ - 600 ₽</option>
                    <option value={3}>более 600 ₽</option>
                </select>
            </form>
            <div style={interface_styles.flex_between_start}>
                <div style={interface_styles.sidebar}>
                    <Link contence={"Полное меню"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                        hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={() => setType(-1)}/>
                    <Link contence={"Пицца"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                        hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={() => setType(0)}/>
                    <Link contence={"Закуски"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                        hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={() => setType(1)}/>
                    <Link contence={"Напитки"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                        hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={() => setType(2)}/>
                </div>
                <div>
                    {tab_render(type_of_product)}
                    <DishConstructorCard image_path={"Constructor.png"}/>
                </div>
            </div>
        </div>
    )
});

export default MenuPage;