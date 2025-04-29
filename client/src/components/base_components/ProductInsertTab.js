import instance from '../../api/server_api';
import { interface_styles, button, button_hover } from '../../styles/ColorData';
import Button from "./Button";

function ProductInsertTab(props) {

    const insertProduct = async (formData) => {
        await instance.post('/add_product', formData).then((response) => {
            alert(response.data);
        })
    };

    return (
        <div style={{marginRight: "150px"}}>
            <form action = {insertProduct} style={{...interface_styles.dish_card_list, ...interface_styles.card_grid_two}}>
                <input type="text" name="name" maxLength={40}/>
                <select className="settings" name="type" defaultValue={1}>
                    <option value={1}>Закуска</option>
                    <option value={2}>Напиток</option>
                </select>
                <input type="number" name="price" defaultValue={0}/>
                <input type="file" name="image" accept="image/*"/>
                <input type="text" name="description" maxLength={150}/>
                <Button text={"Добавить"} main_style={button} hover_style={button_hover}/>
            </form>
        </div>
    )
}

export default ProductInsertTab;