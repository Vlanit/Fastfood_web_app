import {useState, useEffect} from 'react';
import { interface_styles, interface_colors, button, button_hover } from '../../styles/ColorData';
import { observer } from 'mobx-react-lite';
import { main_page_store } from '../../state/MainPageDataState';
import { shopping_cart_store } from '../../state/ShoppingCartState'
import Button from "../base_components/Button";
import Link from '../base_components/Link';
import Topping from '../base_components/Topping';

const ConstructorPage = observer((props) => {
    const [topping_type, setType] = useState(1);
    const [used_toppings, changeToppings] = useState([]);
    const [price, changePrice] = useState(200);
    const [size, setSize] = useState(2);
    const [count, setCount] = useState(1);
    const [dough_type, setDoughType] = useState(1);

    useEffect(() => {
        let new_array = Array(main_page_store.toppings.length).fill(false);
        changeToppings(new_array);
    }, [main_page_store.toppings]);

    const inverseToppingState = (index) => {
        changeToppings(array => [
            ...array.slice(0, index),
            !array[index],
            ...array.slice(index + 1, array.length),
        ]);
    };

    const addPrice = (add_price) => {
        changePrice(price + add_price);
    };

    const reducePrice = (reduce_price) => {
        changePrice(price - reduce_price);
    };

    function AddDishProductToShoppingCart() {
        let ingredients_list = [];
        let description = dough_type == 1 ? 'Стандартное тесто' : 'Пшеничное тесто';
        const correct_price = Math.round(price + price * (size - 2) * 0.15);
        used_toppings.map((item, index) => {
            if (item) {
                ingredients_list.push(index);
                description += ', '
                description += main_page_store.toppings[index].name;
            }
        });
        shopping_cart_store.addCustomDishToCart(count, size, dough_type, correct_price, description, ingredients_list);
    };

    function ClearConstructorData() {
        let new_array = Array(main_page_store.toppings.length).fill(false);
        changeToppings(new_array);
        setType(1);
        changePrice(200);
        setSize(2);
        setCount(1);
        setDoughType(1);
    }

    return (
        <div style={interface_styles.section}>
            <h1>Конструктор пиццы</h1>
            <div style={interface_styles.flex_between_start}>
                <div > 
                    <h3>Основа пиццы</h3>
                    <div style={{...interface_styles.dish_card_list, ...interface_styles.card_grid_two}}>
                        <label>Тесто: </label>
                        <select onChange={(event) => setDoughType(event.target.value)}
                            style={{...interface_styles.select, borderColor: interface_colors.select_border_color}} 
                            id="base_type" name="base_type">
                                <option value={1}>Стандартное</option>
                                <option value={2}>Пшеничное</option>
                        </select>
                        <label>Размер: </label>
                        <select style={{...interface_styles.select, borderColor: interface_colors.select_border_color}} value={size} 
                        onChange={(event) => setSize(event.target.value)}
                            id="size" name="size">
                                <option value={1}>Малая (25 см)</option>
                                <option value={2}>Средняя (30 см)</option>
                                <option value={3}>Большая (35 см)</option>
                        </select>
                        <label style={interface_styles.p}>Количество: </label>
                        <input onChange={(event) => setCount(event.target.value)} 
                            style={{...interface_styles.input, borderColor: interface_colors.input_border_color}} 
                            type="number" name="count" defaultValue={0} min={1} max={6}/>
                    </div>
                    <div style={{width: "589px", height: "589px", marginTop: "20px"}}>
                        <img style={{position: "absolute", width: "589px", height: "589px"}} src='/api/images/1745709455789image.png'/>
                        {main_page_store.toppings !== undefined? 
                                main_page_store.toppings.map((item, index) => 
                                {
                                    if (used_toppings[index])
                                        return <img style={{position: "absolute", width: "589px", height: "589px"}} 
                                            src={`/api/images/${item.constructor_image}`}/>
                                }):
                            null}
                    </div>
                </div>
                <div>
                    <h3>Возможности для вкуса</h3>
                    <div style={{...interface_styles.flex_between_start, width: "810px"}}>
                        <div style={interface_styles.sidebar}>
                            <Link contence={"Соусы"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                                hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={() => setType(1)}/>
                            <Link contence={"Сыр основа"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                                hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={() => setType(2)}/>
                            <Link contence={"Мясные ингредиенты"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                                hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={() => setType(3)}/>
                            <Link contence={"Грибы"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                                hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={() => setType(4)}/>
                            <Link contence={"Овощи и фрукты"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                                hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={() => setType(5)}/>
                            <Link contence={"Морепродукты"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                                hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={() => setType(6)}/>
                            <Link contence={"Дополнительные сыры"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                                hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={() => setType(7)}/>
                        </div>
                        <div style={{...interface_styles.dish_card_list, ...interface_styles.card_grid_four_for_toppings, marginRight: "110px"}}>
                            {main_page_store.toppings !== undefined? 
                                main_page_store.toppings.map((item, index) => 
                                {
                                    if (item.type == topping_type)
                                        return <Topping added={used_toppings[index]} image_path={item.image_path} name={item.name} price={item.price} 
                                            plusAction={() => {inverseToppingState(index); addPrice(item.price)}} 
                                            minusAction={() => {inverseToppingState(index); reducePrice(item.price)}}/>
                                    else
                                        return null;
                                }):
                            null}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{...interface_styles.action_card_list, gap: "180px"}}>
                <Button text={"Начать заново"} main_style={{...button, ...interface_styles.large}}
                    hover_style={{...button_hover, ...interface_styles.large}}
                    onClick={() => ClearConstructorData()}/>
                <h3>Стоимость: {Math.round(price + price * (size - 2) * 0.15) * count} ₽</h3>
                <Button text={"В корзину"} main_style={{...button, ...interface_styles.large}}
                    hover_style={{...button_hover, ...interface_styles.large}}
                    onClick={() => {AddDishProductToShoppingCart(); ClearConstructorData()}}/>
            </div>
        </div>
    );
});

export default ConstructorPage;