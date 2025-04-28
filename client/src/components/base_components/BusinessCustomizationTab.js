import { useState } from "react";
import instance from "../../api/server_api"
import { interface_styles, interface_colors } from "../../styles/ColorData";

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
        <div>
            <form action = {changeBusinessData} style={{...interface_styles.dish_card_list, ...interface_styles.card_grid_two}}>
                <label>Логотип: </label>
                <input type="file" name="image" accept="image/*"/>
                <input type="text" name="about_us_title" placeholder={"Заголовок раздела 'О нас'"}/>
                <input type="text" name="about_us_text" placeholder={"Текст раздела 'О нас'"}/>
                <label>Изображение для блока "О нас": </label>
                <input type="file" name="image" accept="image/*"/>
                <input type="text" name="about_production_title" placeholder={"Заголовок раздела 'О продукции'"}/>
                <input type="text" name="about_production_text" placeholder={"Заголовок раздела 'О продукции'"}/>
                <label>Изображение для блока "О продукции": </label>
                <input type="file" name="image" accept="image/*"/>
                <input type="text" name="contact_person" placeholder={"Контактное лицо"}/>
                <input type="text" name="contact_phone" placeholder={"Контактный телефон"}/>
                <input type="text" name="contact_email" placeholder={"Контактный email"}/>
                <label>Изображение для блока "Контакты": </label>
                <input type="file" name="image" accept="image/*"/>
                <input type="number" name="number_facts_count" min={0} placeholder={"Количество перечисленных файлов"}
                    max={6} value={number_facts_count} onChange={(event) => {setNumberFacts(event.target.value)}}/>
                {factInputs}
                <label>Изображение для блока "В цифрах": </label>
                <input type="file" name="image" accept="image/*"/>
                <button type="submit">Изменить данные</button>
            </form>
        </div>
    )
};

export default BusinessCustomizationTab;