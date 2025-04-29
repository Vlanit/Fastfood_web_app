import { observer } from 'mobx-react-lite';

import ActionCard from "../base_components/ActionCard.js";
import DishCard from "../base_components/DishCard.js";
import ProductCard from "../base_components/ProductCard.js";

import { interface_styles, interface_colors, h1 } from "../../styles/ColorData.js";
import { main_page_store } from "../../state/MainPageDataState.js";
import { shopping_cart_store } from '../../state/ShoppingCartState.js';

const ActionPage = observer((props) => {

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

    console.log(main_page_store.actions);

    return (
        <div style={interface_styles.section}>
            {main_page_store.actions !== undefined?
                <div style={interface_styles.section}>
                    <h1 style={h1}>Акции</h1>
                    <div style={interface_styles.action_card_list_down}>
                        {main_page_store.actions !== undefined? 
                            main_page_store.actions.map((item, index) => (
                                (index < 2) ?<ActionCard big={true} name={item.name} description={item.description} image_path={item.image_path}/>:null
                            )):
                        <></>}
                    </div>
                    <div style={interface_styles.action_card_list}>
                        {main_page_store.actions !== undefined? 
                            main_page_store.actions.map((item, index) => (
                                (index >= 2) ?<ActionCard name={item.name} description={item.description} image_path={item.image_path}/>:null
                            )):
                        <></>}
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
        </div>
    )
});

export default ActionPage;