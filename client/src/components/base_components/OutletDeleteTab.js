import instance from '../../api/server_api';
import { useState } from 'react';
import { interface_styles, button, button_hover } from '../../styles/ColorData';
import Button from "./Button";
import { franchise_data_store } from '../../state/FranchiseDataState';

function OutletDeleteTab(props) {
    const [current_outlet, setOutlet] = useState(0);
    const outlets_list = franchise_data_store.outlets;

    const deleteOutlet = async (formData) => {
        await instance.delete('/delete_outlet', {id: current_outlet}).then((response) => {
            alert(response.data);
        })
    };

    return (
        <div style={{marginRight: "150px"}}>
            <form action = {deleteOutlet} style={{...interface_styles.dish_card_list, ...interface_styles.card_grid_two}}>
                <select style={{...interface_styles.select, borderColor: interface_colors.select_border_color}} 
                    id="id" name="id" value={current_outlet}
                    onChange={(event) => setOutlet(event.target.value)}>
                        {outlets_list.map((item, index) => (
                            <option value={index}>{item.address}</option>
                    ))}
                    </select>
                <Button text={"Удалить"} main_style={button} hover_style={button_hover}/>
            </form>
        </div>
    )
}

export default OutletDeleteTab;