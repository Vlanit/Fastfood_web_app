import instance from '../../api/server_api';
import { interface_styles, input, select, button, button_hover } from "../../styles/ColorData";
import Button from "./Button";

function ActionInsertTab(props) {

    const insertAction = async (formData) => {
        await instance.post('/add_action', formData).then((response) => {
            alert(response.data.result);
        })
    };

    return (
        <div style={{marginRight: "150px"}}>
            <form action = { insertAction } style={{...interface_styles.dish_card_list, ...interface_styles.card_grid_two}}>
                <input style={input} type="text" name="name" placeholder={'Заголовок'} maxLength={200}/>
                <input style={input} type="text" name="description" placeholder={'Описание'}/>
                <input style={input} type="file" name="image" accept="image/*"/>
                <Button text={"Добавить"} main_style={button} hover_style={button_hover}/>
            </form>
        </div>
    )
}

export default ActionInsertTab;