import instance from '../../api/server_api';
import { interface_styles, button, button_hover } from '../../styles/ColorData';
import Button from "./Button";

function OutletInsertTab(props) {

    const insertProduct = async (formData) => {
        let post_data = {};
        for (var [key, value] of formData.entries()) { 
            post_data[key] = value;
        }
        await instance.post('/add_product', post_data).then((response) => {
            alert(response.data);
        })
    };

    return (
        <div style={{marginRight: "150px"}}>
            <form action = {insertProduct} style={{...interface_styles.dish_card_list, ...interface_styles.card_grid_two}}>
                <input type="text" name="town" placeholder="Город" maxLength={24}/>
                <input type="text" name="district" placeholder="Район" maxLength={24}/>
                <input type="text" name="address" placeholder="Адрес" maxLength={75}/>
                <Button text={"Добавить"} main_style={button} hover_style={button_hover}/>
            </form>
        </div>
    )
}

export default OutletInsertTab;