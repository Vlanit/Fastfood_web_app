import {useState, useEffect} from 'react';
import instance from '../../api/server_api';
import { interface_styles, button, button_hover } from '../../styles/ColorData';
import Button from "./Button";

function DishInsertTab(props) {
    const [topping_list] = useState(props.toppings);

    console.log(props.toppings);

    const insertDish = async (formData) => {
        await instance.post('/add_dish', formData).then((response) => {
            alert(response.data.result);
        })
    };

    return (
        <div style={{marginRight: "150px"}}>
            <form action = {insertDish}>
                <input type="text" name="name" maxLength={50}/>
                <select className="settings" name="dough_type" defaultValue={1}>
                    <option value={0}>Стандартное тесто</option>
                    <option value={1}>Пшеничное тесто</option>
                </select>
                <input type="number" name="price" defaultValue={0}/>
                <input type="file" name="image" accept="image/*"/>
                <div style={interface_styles.info_card_table}>
                    {props.toppings !== undefined? topping_list.map(item => 
                    (
                        <div>
                            <img src={`/api/images/${item.image_path}`}></img>
                            <input type="checkbox" name={item.topping_id}/>
                        </div>
                    )):<></>}
                </div>
                <Button text={"Добавить"} main_style={button} hover_style={button_hover}/>
            </form>
        </div>
    )
}

export default DishInsertTab;