import { useState } from 'react';
import instance from '../../api/server_api';

import { franchise_data_store } from '../../state/FranchiseDataState';
import { interface_styles, interface_colors, input, button, button_hover, select } from '../../styles/ColorData';
import { shopping_cart_store } from '../../state/ShoppingCartState';
import Button from './Button';
import LinkImage from './LinkImage';

function ClientRegistrationTab(props) {
    const [current_town, setTown] = useState(0);

    const registerClient = async (formData) => {
        await instance.post('/register_new_client', formData).then((response) => {
            alert(response.data);
        })
    };

    return (
        <div style={{...interface_styles.modal_window, backgroundColor: interface_colors.background_color}}>
            <form style={interface_styles.login} action={registerClient}>
                <input style={input} type="text" name="name" placeholder="Имя" maxLength={12}/>
                <input style={input} type="text" name="surname" placeholder="Фамилия" maxLength={36}/>

                <select style={select} 
                    id="town" name="town" onChange={(event) => setTown(event.target.value)}>
                        {franchise_data_store.towns.map((item, index) => (
                            <option value={index}>{item.town}</option>
                        ))}
                </select>

                <select style={select} 
                    id="outlet" name="outlet" onChange={(event) => shopping_cart_store.outlet = event.target.value}>
                        {
                            franchise_data_store.outlets.map(item =>
                                {
                                    if (franchise_data_store.towns[current_town]==item.town) {
                                        return <option value={item.outlet_id}>{item.address}</option>
                                }
                            }
                        )
                    }
                </select>
                <input style={input} type="text" name="login" placeholder="Логин" maxLength={20}/>
                <input style={input} type="text" name="password" placeholder="Пароль" maxLength={30}/>
                <Button text={"Зарегистрировать"} main_style={button} hover_style={button_hover}/>
            </form>
                <LinkImage image_name={"ExitButton.svg"} main_style={interface_styles.exit_button} 
                    hover_style={{...interface_styles.exit_button, backgroundColor: interface_colors.a_color_hover}}
                    onClick={() => props.exit_action()}/>
        </div>
        
    )
}

export default ClientRegistrationTab;