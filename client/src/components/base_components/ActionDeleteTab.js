import instance from '../../api/server_api';
import { useState } from 'react';
import { interface_styles, button, button_hover } from '../../styles/ColorData';
import Button from "./Button";
import { main_page_store } from '../../state/MainPageDataState';

function ActionDeleteTab(props) {
    const [current_action, setAction] = useState(0);

    const deleteAction = async (formData) => {
        await instance.delete('/delete_action', {
                id: main_page_store.actions[current_action].action_id, 
                filename: main_page_store.actions[current_action].action_id
            }).then((response) => {
            alert(response.data);
        })
    };

    return (
        <div style={{marginRight: "150px"}}>
            {main_page_store.actions !== undefined != 0?
                <form action = {deleteAction} style={{...interface_styles.dish_card_list, ...interface_styles.card_grid_two}}>
                <select style={{...interface_styles.select, borderColor: interface_colors.select_border_color}} 
                    id="id" name="id" value={current_action}
                    onChange={(event) => setAction(event.target.value)}>
                        {main_page_store.actions.map((item, index) => (
                            <option value={index}>{item.name}</option>
                    ))}
                    </select>
                <Button text={"Удалить"} main_style={button} hover_style={button_hover}/>
                </form>
                :null}
        </div>
    )
}

export default ActionDeleteTab;