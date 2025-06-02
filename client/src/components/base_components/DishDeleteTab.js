import instance from '../../api/server_api';
import { useState } from 'react';
import { interface_styles, interface_colors, button, button_hover } from '../../styles/ColorData';
import Button from "./Button";
import { main_page_store } from '../../state/MainPageDataState';

function DishDeleteTab(props) {
    const [current_dish, setDish] = useState(0);

    const deleteDish = async (formData) => {
        await instance.delete('/delete_dish', {
                id: main_page_store.dishes[current_dish].dish_id, 
                filename: main_page_store.dishes[current_dish].image_path
            }).then((response) => {
            alert(response.data);
        })
    };

    return (
        <div style={{marginRight: "150px"}}>
            {main_page_store.dishes !== undefined?
                <form action = {deleteDish} style={{...interface_styles.dish_card_list, ...interface_styles.card_grid_two}}>
                <select style={{...interface_styles.select, borderColor: interface_colors.select_border_color}} 
                    id="id" name="id" value={current_dish}
                    onChange={(event) => setDish(event.target.value)}>
                        {main_page_store.dishes.map((item, index) => (
                            <option value={index}>{item.name}</option>
                    ))}
                    </select>
                <Button text={"Удалить"} main_style={button} hover_style={button_hover}/>
                </form>
                :null}
        </div>
    )
}

export default DishDeleteTab;