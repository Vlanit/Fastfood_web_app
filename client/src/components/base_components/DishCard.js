import Button from "./Button";
import Link from "./Link";

import { interface_colors, interface_styles, p } from "../../styles/ColorData";
import { shopping_cart_store } from "../../state/ShoppingCartState";
import { main_page_store } from "../../state/MainPageDataState";

function DishCard(props) {
    const size_array = ['Малая (25 см)', 'Средняя (30 см)', 'Большая (35 см)'];

    function minusAction() {
        switch(props.type) {
            case 'dish': 
                shopping_cart_store.decreaseCountOfDish(props.id.toString());
                return;
            case 'product':
                shopping_cart_store.decreaseCountOfProduct(props.id.toString());
                return;
            case 'custom':
                shopping_cart_store.decreaseCountOfCustom(props.id);
                return;
        }
    };

    function plusAction() {
        console.log(props.type);
        switch(props.type) {
            case 'dish': 
                shopping_cart_store.increaseCountOfDish(props.id.toString());
                return;
            case 'product':
                shopping_cart_store.increaseCountOfProduct(props.id.toString());
                return;
            case 'custom':
                shopping_cart_store.increaseCountOfCustom(props.id);
                return;
        }
    };

    const baseStyle = (props.mini?interface_styles.dish_card_mini:interface_styles.dish_card);

    const buttonStyle = {...interface_styles.button, color: interface_colors.button_text_color, backgroundColor: interface_colors.button_color};
    const buttonHoverStyle = {...interface_styles.button, color: interface_colors.button_text_color_hover, backgroundColor: interface_colors.button_color_hover};
    const image_size = interface_styles.dish_card_mini.width;

    return (
        <div style={{backgroundColor: interface_colors.card_background_color, ...baseStyle}}>
            {props.discount != null ? 
            <div style={{...interface_styles.discount, backgroundColor:interface_colors.discount_background_color}}>
                <p style={{...interface_styles.p, color: interface_colors.secondary_text_color}}>{`-${props.discount}%`}</p>
            </div>: null}
            {props.image_path !== undefined?
                <img src={`http://localhost:3000/api/images/${props.image_path}`}/>
                :
                props.ingredients_list !== undefined?
                        <div style={{position: 'relative', width: image_size, height: image_size}}>
                            <img style={{position: "absolute", bottom: 0, left: 0, width: image_size, height: image_size}} 
                                src='http://localhost:3000/api/images/1745709455789image.png'/>
                            {props.ingredients_list.map(item => 
                                <img style={{position: "absolute", bottom: 0, left: 0, width: image_size, height: image_size}} 
                                    src={`http://localhost:3000/api/images/${main_page_store.toppings[item].constructor_image}`}/>
                            )}
                        </div>
                    :null
            }
            <h3 style={interface_colors.h3}>{props.name}</h3>
            {props.description !== undefined && props.description != "" ? 
                <p style={{...interface_colors.description, color:interface_colors.description_text_color}}>{props.description}</p>
                :null}
            {props.discount_end_date!= null ?
                <p style={{...interface_styles.p, ...interface_styles.bold}}>{`Дата окончания: ${props.discount_end_date}`}</p>
                :null}
            {props.size !== undefined ? 
                <p style={{...interface_styles.p, ...interface_styles.bold}}>{size_array[props.size]}</p>
            :null}
            <div style={interface_styles.flex_between}>
                <p style={{...interface_styles.p, ...interface_styles.bold}}>
                    {`${props.discount != null ? Math.round(props.price - props.price * props.discount / 100) : props.price} ₽`}
                </p>
                {props.count !== undefined? 
                <div style={{...interface_styles.change_num, ...interface_styles.flex_between, backgroundColor: interface_colors.secondary_background_color}}>
                    {props.can_interact?
                        <Link contence={"-"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                            hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} 
                            onClick={()=>minusAction()}/>
                    :null}
                    <h3 style={interface_styles.h3}>{props.count}</h3>
                    {props.can_interact?
                        <Link contence={"+"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                            hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}}
                            onClick={() => plusAction()}/>
                    :null}
                </div>:
                <Button text={"В корзину"} main_style={{...buttonStyle, ...interface_styles.small}}
                    hover_style={{...buttonHoverStyle, ...interface_styles.small}} onClick={()=>props.button_action()}/>}
            </div>
        </div>
    );
}

export default DishCard;