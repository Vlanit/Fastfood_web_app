import instance from '../../api/server_api';
import { interface_styles, interface_colors } from "../../styles/ColorData";

function ToppingInsertTab(props) {

    const insertTopping = async (formData) => {
        await instance.post('/add_topping', formData).then((response) => {
            alert(response.data.result);
        })
    };

    return (
        <div>
            <form action = { insertTopping } style={{...interface_styles.dish_card_list, ...interface_styles.card_grid_two}}>
                <input type="text" name="name" maxLength={40}/>
                <select className="settings" name="type" defaultValue={1}>
                    <option value={1}>Соусы</option>
                    <option value={2}>Сыр-основа</option>
                    <option value={3}>Мясные-ингредиенты</option>
                    <option value={4}>Грибы</option>
                    <option value={5}>Овощи и фрукты</option>
                    <option value={6}>Морепродукты</option>
                    <option value={7}>Дополнительные сыры</option>
                </select>
                <input type="number" name="price" defaultValue={0}/>
                <input type="file" name="image" accept="image/*"/>
                <input type="checkbox" name="ismeaty"/>
                <input type="checkbox" name="issricy"/>
                <button type="submit"> Добавить </button>
            </form>
        </div>
    )
}

export default ToppingInsertTab;