import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { main_page_store } from '../../state/MainPageDataState.js';
import { shopping_cart_store } from '../../state/ShoppingCartState.js';

import Button from '../base_components/Button.js';
import ActionCard from '../base_components/ActionCard.js';
import DishCard from '../base_components/DishCard.js';
import DishConstructorCard from '../base_components/DishConstructorCard.js';

import { interface_colors, interface_styles } from '../../styles/ColorData.js';

const MainPage = observer((props) => {
    const [type_of_product, setProductType] = useState(0);

    const buttonStyle = {...interface_styles.button, color: interface_colors.button_text_color, backgroundColor: interface_colors.button_color};
    const buttonHoverStyle = {...interface_styles.button, color: interface_colors.button_text_color_hover, backgroundColor: interface_colors.button_color_hover};

    let navigate = useNavigate(); 
    console.log(main_page_store.dishes);

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

    return (
        <section style={interface_styles.section}>
            {main_page_store.actions.length>0?
                <div style={{...interface_styles.section, margin: "0px 0px"}}>
                <h1 style={interface_styles.h1}>Акции</h1>
                    <div style={interface_styles.action_card_list}>
                        {main_page_store.actions !== undefined? main_page_store.actions.map(item => (
                            <ActionCard name={item.name} description={item.description} image_path={item.image_path}/>
                        )):<></>}
                    </div>
                    <div style={interface_styles.action_card_list}>
                    <Button text={"Посмотреть все доступные акции"} main_style={{...buttonStyle, ...interface_styles.large}}
                        hover_style={{...buttonHoverStyle, ...interface_styles.large}} onClick={() => navigate('/actions')}/>
                    </div>
                </div>
            :null
            }
            {main_page_store.dishes.length > 0 || main_page_store.products.length > 0 ?
                <div style={{...interface_styles.section, margin: "0px 0px"}}>
                    <h1 style={interface_styles.h1}>Особые предложения</h1>
                    <div style={{...interface_styles.dish_card_list, ...interface_styles.card_grid_four}}>
                        {main_page_store.dishes !== undefined? 
                            main_page_store.dishes.map((item, index) => (
                                (item.end_date != null && item.discount != null)?
                                <DishCard mini={false} id={index}
                                    name={item.name} description={item.description} image_path={item.image_path} 
                                    discount={item.discount} price={item.price} discount_end_date={item.discount_end_date}
                                    count={shopping_cart_store.dish_array.get(index.toString())?.count}
                                    type={'dish'}
                                    button_action={() => cardAction('dish', index, item)} can_interact={true}/>:
                            null
                        )): 
                        null}
                        {main_page_store.products !== undefined? 
                            main_page_store.products.map((item, index) => (
                                (item.end_date != null && item.discount != null)?
                                <DishCard mini={false} id={index} name={item.name} description={item.description} image_path={item.image_path} 
                                    discount={item.discount} price={item.price} discount_end_date={item.discount_end_date}
                                    count={shopping_cart_store.product_array.get(index.toString())?.count}
                                    type={'product'}
                                    button_action={() => cardAction('product', index, item)} can_interact={true}/>:
                            null
                        )): 
                        null}
                    </div>
                </div>:null}
            <h1 style={interface_styles.h1}>Популярные блюда</h1>
            <div style={interface_styles.action_card_list}>
                <Button text={"Пицца"} main_style={{...buttonStyle, ...interface_styles.large}}
                    hover_style={{...buttonHoverStyle, ...interface_styles.large}} onClick={() => setProductType(0)}/>
                <Button text={"Закуски"} main_style={{...buttonStyle, ...interface_styles.large}}
                    hover_style={{...buttonHoverStyle, ...interface_styles.large}} onClick={() => setProductType(1)}/>
                <Button text={"Напитки"} main_style={{...buttonStyle, ...interface_styles.large}}
                    hover_style={{...buttonHoverStyle, ...interface_styles.large}} onClick={() => setProductType(2)}/>
            </div>
            <div style={{...interface_styles.dish_card_list, ...interface_styles.card_grid_four}}>
                {main_page_store.dishes?.length > 0 || main_page_store.products?.length > 0?
                    (type_of_product==0?
                        main_page_store.dishes.map((item, index) => (
                            <DishCard mini={false} id={index} name={item.name} description={item.description} image_path={item.image_path} 
                                discount={item.discount} price={item.price} discount_end_date={item.discount_end_date} 
                                count={shopping_cart_store.dish_array.get(index.toString())?.count}
                                type={'dish'}
                                button_action={() => cardAction('dish', index, item)} can_interact={true}/>
                    )):
                    (type_of_product>0?
                        main_page_store.products.map((item, index) => (
                            item.type==type_of_product?
                            <DishCard mini={false} id={index} name={item.name} description={item.description} image_path={item.image_path} 
                                discount={item.discount} price={item.price} discount_end_date={item.discount_end_date} 
                                count={shopping_cart_store.product_array.get(index.toString())?.count}
                                type={'product'}
                                button_action={() => cardAction('product', index, item)} can_interact={true}/>:null
                    )): 
                    null)):
                null}
            </div>
            <div style={interface_styles.action_card_list}>
                <Button text={"Открыть полное меню"} main_style={{...buttonStyle, ...interface_styles.large}}
                    hover_style={{...buttonHoverStyle, ...interface_styles.large}} onClick={() => navigate('/menu')}/>
            </div>
            <DishConstructorCard image_path={"Constructor.png"}/>
        </section>
    );
});

export default MainPage;