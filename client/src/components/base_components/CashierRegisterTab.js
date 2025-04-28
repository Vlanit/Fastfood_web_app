import instance from '../../api/server_api';
import { interface_styles, interface_colors } from "../../styles/ColorData";

function CashierRegisterTab(props) {
    const outlet_list = props.outlets.data;

    const registerCashier = async (formData) => {
        await instance.post('/register_new_cashier', formData).then((response) => {
            alert(response.data);
        })
    };

    return (
        <div>
            {props.outlets !== undefined?
            <form action={registerCashier} style={{...interface_styles.dish_card_list, ...interface_styles.card_grid_two}}>
                <input type="text" name="name" maxLength={12}/>
                <input type="text" name="surname" maxLength={36}/>
                <select className="settings" name="outlet">
                    {outlet_list.map(item => (<option value={item.outlet_id}>{item.address}</option>))}
                </select>
                <input type="text" name="login" maxLength={20}/>
                <input type="text" name="password" maxLength={30}/>
                <button type="submit"> Зарегистрировать </button>
            </form>:
            <h1>Вы ещё не внесли в перечень ни одно заведение!</h1>
        }
        </div>
        
    )
}

export default CashierRegisterTab;