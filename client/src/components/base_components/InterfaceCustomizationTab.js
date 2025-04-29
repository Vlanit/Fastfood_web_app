import {interface_colors, interface_styles, p, button, button_hover, select} from "../../styles/ColorData";
import Button from "./Button";
import instance from "../../api/server_api";

function InterfaceCustomizationTab(props) {

    const insertInterfaceChanges = async (formData) => {
        let post_data = {};
        for (var [key, value] of formData.entries()) { 
            post_data[key] = value;
        }
        await instance.post('/change_interface_data', post_data).then((response) => {
            alert(response.data.result);
        })
    };

    return (
        <div style={{marginRight: "150px"}}>
            <form action={insertInterfaceChanges} style={{...interface_styles.dish_card_list, ...interface_styles.card_grid_two}}>
                <label style={p}>Задний фон: </label>
                <input type="color" id="background_color" name="background_color" defaultValue={interface_colors.background_color}/>
                <label style={p}>Вторичный задний фон: </label>
                <input type="color" id="secondary_background_color" name="secondary_background_color" defaultValue={interface_colors.secondary_background_color}/>
                <label style={p}>Карточный задний фон: </label>
                <input type="color" id="card_background_color" name="card_background_color" defaultValue={interface_colors.card_background_color}/>
                <label style={p}>Цвет плашек скидки: </label>
                <input type="color" id="discount_background_color" name="discount_background_color" defaultValue={interface_colors.discount_background_color}/>
                <label style={p}>Цвет основного текста: </label>
                <input type="color" id="text_color" name="text_color" defaultValue={interface_colors.text_color}/>
                <label style={p}>Вторичный цвет текста: </label>
                <input type="color" id="secondary_text_color" name="secondary_text_color" defaultValue={interface_colors.secondary_text_color}/>
                <label style={p}>Цвет текста скидки: </label>
                <input type="color" id="description_text_color" name="description_text_color" defaultValue={interface_colors.description_text_color}/>
                <label style={p}>Цвет основных заголовков: </label>
                <input type="color" id="h1_color" name="h1_color" defaultValue={interface_colors.h1_color}/>
                <label style={p}>Цвет вторичных заголовков: </label>
                <input type="color" id="h2_color" name="h2_color" defaultValue={interface_colors.h2_color}/>
                <label style={p}>Цвет неважных заголовков: </label>
                <input type="color" id="h3_color" name="h3_color" defaultValue={interface_colors.h3_color}/>
                <label style={p}>Цвет кнопок: </label>
                <input type="color" id="button_color" name="button_color" defaultValue={interface_colors.button_color}/>
                <label style={p}>Цвет текста кнопок: </label>
                <input type="color" id="button_text_color" name="button_text_color" defaultValue={interface_colors.button_text_color}/>
                <label style={p}>Цвет кнопок при наведении: </label>
                <input type="color" id="button_color_hover" name="button_color_hover" defaultValue={interface_colors.button_color_hover}/>
                <label style={p}>Цвет текста кнопок при наведении: </label>
                <input type="color" id="button_text_color_hover" name="button_text_color_hover" defaultValue={interface_colors.button_text_color_hover}/>
                <label style={p}>Цвет ссылок: </label>
                <input type="color" id="a_color" name="a_color" defaultValue={interface_colors.a_color}/>
                <label style={p}>Цвет ссылок при наведении: </label>
                <input type="color" id="a_color_hover" name="a_color_hover" defaultValue={interface_colors.a_color_hover}/>
                <label style={p}>Цвет границ полей выбора: </label>
                <input type="color" id="select_border_color" name="select_border_color" defaultValue={interface_colors.select_border_color}/>
                <label style={p}>Цвет границ полей ввода: </label>
                <input type="color" id="input_border_color" name="input_border_color" defaultValue={interface_colors.input_border_color}/>
                <label style={p}>Используемый макет: </label>
                <select style={select} id="layout_num" name="layout_num">
                    <option value={1}>Стандарт</option>
                    <option value={2}>ДоДо-стиль</option>
                </select>
                <Button text={"Изменить дизайн"} main_style={button} hover_style={button_hover}/>
            </form>
        </div>
    )
}

export default InterfaceCustomizationTab;