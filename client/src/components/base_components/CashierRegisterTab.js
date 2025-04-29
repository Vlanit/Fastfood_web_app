import instance from '../../api/server_api';
import { interface_styles, input, p, select, button, button_hover } from "../../styles/ColorData";
import { franchise_data_store } from '../../state/FranchiseDataState';
import Button from "./Button";

function CashierRegisterTab(props) {
    const outlet_list = franchise_data_store.outlets;

    const registerCashier = async (formData) => {
        await instance.post('/register_new_cashier', formData).then((response) => {
            alert(response.data);
        })
    };

    return (
        <div style={{marginRight: "150px"}}>
            {outlet_list !== undefined?
            <form action={registerCashier} style={{...interface_styles.dish_card_list, ...interface_styles.card_grid_two}}>
                <input style={input} type="text" name="name" placeholder="Имя" maxLength={12}/>
                <input style={input} type="text" name="surname" placeholder="Фамилия" maxLength={36}/>
                <select style={select} className="settings" name="outlet">
                    {outlet_list.map(item => (<option value={item.outlet_id}>{item.address}</option>))}
                </select>
                <input style={input} type="text" name="login" placeholder="Логин" maxLength={20}/>
                <input style={input} type="text" name="password" placeholder="Пароль" maxLength={30}/>
                <Button text={"Зарегистрировать"} main_style={button} hover_style={button_hover}/>
            </form>:
            <h1>Вы ещё не внесли в перечень ни одно заведение!</h1>
        }
        </div>
        
    )
}

export default CashierRegisterTab;