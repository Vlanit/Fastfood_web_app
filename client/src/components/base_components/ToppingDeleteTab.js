import instance from '../../api/server_api';
import { useState } from 'react';
import { interface_styles, button, button_hover } from '../../styles/ColorData';
import Button from "./Button";
import { main_page_store } from '../../state/MainPageDataState';

function ToppingDeleteTab(props) {
    const [current_topping, setTopping] = useState(0);

    const deleteTopping = async (formData) => {
        await instance.delete('/delete_topping', {
                id: main_page_store.toppings[current_topping].topping_id, 
                filename: main_page_store.toppings[current_topping].image_path
            }).then((response) => {
            alert(response.data);
        })
    };

    return (
        <div style={{marginRight: "150px"}}>
            {main_page_store.toppings !== undefined != 0?
                <form action = {deleteTopping} style={{...interface_styles.dish_card_list, ...interface_styles.card_grid_two}}>
                <select style={{...interface_styles.select, borderColor: interface_colors.select_border_color}} 
                    id="id" name="id" value={current_topping}
                    onChange={(event) => setTopping(event.target.value)}>
                        {main_page_store.toppings.map((item, index) => (
                            <option value={index}>{item.name}</option>
                    ))}
                    </select>
                <Button text={"Удалить"} main_style={button} hover_style={button_hover}/>
                </form>
                :null}
        </div>
    )
}

export default ToppingDeleteTab;