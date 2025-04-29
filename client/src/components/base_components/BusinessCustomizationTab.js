import { useState } from "react";
import instance from "../../api/server_api"
import { interface_styles, input, p, button, button_hover } from "../../styles/ColorData";
import Button from "./Button";

function BusinessCustomizationTab(props) {
    const [number_facts_count, setNumberFacts] = useState(0);

    const changeBusinessData = async (formData) => {
        let post_data = {};
        for (var [key, value] of formData.entries()) { 
            if (key != "image")
                post_data[key] = value;
            else {
                if (post_data[key] === undefined) {
                    post_data[key] = [];
                }
                post_data[key].push(value);
            }
        }
        await instance.post('/change_business_data', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then((response) => {
            alert(response.data.result);
        })
    };

    const factInputs = [];
    for (let i = 0; i < number_facts_count; i++) {
        factInputs.push(
            <div>
                <input type="number" name={`number_fact_${i}`} placeholder={"Число факта"}/>
                <input type="text" name={`text_fact_${i}`} placeholder={"Текст факта"}/>
            </div>
        );
    }

    return (
        <div style={{marginRight: "150px"}}>
            <form action = {changeBusinessData} style={{...interface_styles.dish_card_list, ...interface_styles.card_grid_two}}>
                <label style={interface_styles.bold}>Логотип: </label>
                <input style={input} type="file" name="image" accept="image/*"/>
                <input style={input} type="text" name="about_us_title" placeholder={"Заголовок раздела 'О нас'"}/>
                <input style={input} type="text" name="about_us_text" placeholder={"Текст раздела 'О нас'"}/>
                <label style={interface_styles.bold}>Изображение для блока "О нас": </label>
                <input style={input} type="file" name="image" accept="image/*"/>
                <input style={input} type="text" name="about_production_title" placeholder={"Заголовок раздела 'О продукции'"}/>
                <input style={input} type="text" name="about_production_text" placeholder={"Заголовок раздела 'О продукции'"}/>
                <label style={interface_styles.bold}>Изображение для блока "О продукции": </label>
                <input style={input} type="file" name="image" accept="image/*"/>
                <input style={input} type="text" name="contact_person" placeholder={"Контактное лицо"}/>
                <input style={input} type="text" name="contact_phone" placeholder={"Контактный телефон"}/>
                <input style={input} type="text" name="contact_email" placeholder={"Контактный email"}/>
                <label style={interface_styles.bold}>Изображение для блока "Контакты": </label>
                <input style={input} type="file" name="image" accept="image/*"/>
                <input style={input} type="number" name="number_facts_count" min={0} placeholder={"Количество перечисленных файлов"}
                    max={6} value={number_facts_count} onChange={(event) => {setNumberFacts(event.target.value)}}/>
                {factInputs}
                <label style={interface_styles.bold}>Изображение для блока "В цифрах": </label>
                <input style={input} type="file" name="image" accept="image/*"/>
                <Button text={"Изменить данные"} main_style={button} hover_style={button_hover}/>
            </form>
        </div>
    )
};

export default BusinessCustomizationTab;