import { useState } from 'react';
import instance from '../../api/server_api';

import { franchise_data_store } from '../../state/FranchiseDataState';
import { interface_styles, interface_colors } from '../../styles/ColorData';
import { shopping_cart_store } from '../../state/ShoppingCartState';

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
                <input type="text" name="name" placeholder="Имя" maxLength={12}/>
                <input type="text" name="surname" placeholder="Фамилия" maxLength={36}/>

                <select style={{...interface_styles.select, borderColor: interface_colors.select_border_color}} 
                    id="town" name="town" onChange={(event) => setTown(event.target.value)}>
                        {franchise_data_store.towns.map((item, index) => (
                            <option value={index}>{item.town}</option>
                        ))}
                </select>

                <select style={{...interface_styles.select, borderColor: interface_colors.select_border_color}} 
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
                <input type="text" name="login" placeholder="Логин" maxLength={20}/>
                <input type="text" name="password" placeholder="Пароль" maxLength={30}/>
                <button type="submit"> Зарегистрировать </button>
            </form>
            <a class="exit_button" onClick={() => props.exit_action()}><img src="http://localhost:3000/api/images/ExitButton.svg"/></a>
        </div>
        
    )
}

export default ClientRegistrationTab;