import {useState} from 'react';
import { shopping_cart_store } from '../../state/ShoppingCartState.js';

import { interface_styles, interface_colors } from '../../styles/ColorData.js';

import Button from './Button';
import LinkImage from './LinkImage';

function DishProductWindow(props) {
    const size_array = ['Малая (25 см)', 'Средняя (30 см)', 'Большая (35 см)'];
    const [count, setCount] = useState(1);
    const [size, setSize] = useState(2);

    const handleSizeChange = (event) => {
        const { value } = event.target;
        setSize(value);
    };

    const handleCountChange = (event) => {
        const { value } = event.target;
        setCount(value);
    };

    function AddDishProductToShoppingCart() {
        if (props.dish) {
            console.log(props.id);
            shopping_cart_store.addDishToCart(props.id.toString(), props.real_id, count, size, props.price);
        }
        else {
            shopping_cart_store.addProductToCart(props.id.toString(), props.real_id, count, props.price);
        }
    };

    const buttonStyle = {...interface_styles.button, color: interface_colors.button_text_color, backgroundColor: interface_colors.button_color};
    const buttonHoverStyle = {...interface_styles.button, color: interface_colors.button_text_color_hover, backgroundColor: interface_colors.button_color_hover};

    return (
        <div style={{...interface_styles.dish_info_card, ...interface_styles.modal_window, backgroundColor: interface_colors.card_background_color}}>
            <div style={interface_styles.dish_part}>
                <h1 style={interface_styles.h1}>{props.name}</h1>
                <img src={`/api/images/${props.image_path}`}/>
            </div>
            <div style={{...interface_styles.description_part, backgroundColor: interface_colors.secondary_background_color}}>
                <div style={interface_styles.description_part_table}>
                    {props.dish?
                        <label style={interface_styles.p}>Размер: </label>
                    :null}
                    {props.dish?
                        <select style={{...interface_styles.select, borderColor: interface_colors.select_border_color}} id="size" name="size" 
                            value={size} onChange={handleSizeChange}>
                                {size_array.map((item, index) => <option value={index+1}>{item}</option>)}
                        </select>
                    :null}
                    {props.description != "" ?
                        <label style={interface_styles.p}>Описание: </label>
                    : null}
                    {props.description != "" ?
                        <p style={interface_styles.description}>{props.description}</p>
                    : null}
                    <label style={interface_styles.p}>Количество: </label>
                    <input style={{...interface_styles.input, borderColor: interface_colors.input_border_color}} 
                        type="number" name="count" defaultValue={count} min={1} max={6} onChange={handleCountChange}/>
                </div>
                <div style={interface_styles.flex_between}>
                    <Button text={"В конструктор"} main_style={{...buttonStyle, ...interface_styles.small}}
                        hover_style={{...buttonHoverStyle, ...interface_styles.small}}/>
                    <p style={{...interface_styles.p, ...interface_styles.bold}}>{`Цена: ${props.price} ₽`}</p>
                    <Button text={"В корзину"} main_style={{...buttonStyle, ...interface_styles.small}}
                        hover_style={{...buttonHoverStyle, ...interface_styles.small}}
                        onClick={() => {AddDishProductToShoppingCart(); props.exit_action()}}/>
                </div>
                <LinkImage image_name={"ExitButton.svg"} main_style={interface_styles.exit_button} 
                    hover_style={{...interface_styles.exit_button, backgroundColor: interface_colors.a_color_hover}}
                    onClick={() => props.exit_action()}/>
            </div>
        </div>
    )
}

export default DishProductWindow;