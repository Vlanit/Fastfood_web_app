import instance from '../../api/server_api';
import { interface_styles, input, select, button, button_hover } from "../../styles/ColorData";
import Button from "./Button";

function ToppingInsertTab(props) {

    const insertTopping = async (formData) => {
        await instance.post('/add_topping', formData).then((response) => {
            alert(response.data.result);
        })
    };

    return (
        <div style={{marginRight: "150px"}}>
            <form action = { insertTopping } style={{...interface_styles.dish_card_list, ...interface_styles.card_grid_two}}>
                <input style={input} type="text" name="name" maxLength={40}/>
                <select style={select} className="settings" name="type" defaultValue={1}>
                    <option value={1}>Соусы</option>
                    <option value={2}>Сыр-основа</option>
                    <option value={3}>Мясные-ингредиенты</option>
                    <option value={4}>Грибы</option>
                    <option value={5}>Овощи и фрукты</option>
                    <option value={6}>Морепродукты</option>
                    <option value={7}>Дополнительные сыры</option>
                </select>
                <input style={input} type="number" name="price" defaultValue={0}/>
                <input style={input} type="file" name="image" accept="image/*"/>
                <input style={input} type="checkbox" name="ismeaty"/>
                <input style={input} type="checkbox" name="issricy"/>
                <Button text={"Добавить"} main_style={button} hover_style={button_hover}/>
            </form>
        </div>
    )
}

export default ToppingInsertTab;