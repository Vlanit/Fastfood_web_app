import instance from '../../api/server_api';
import { interface_styles, input, p, select, button, button_hover } from "../../styles/ColorData";
import { franchise_data_store } from '../../state/FranchiseDataState';
import Button from "./Button";
import { useState, useEffect } from 'react';

function CashierDataChangeTab(props) {
    const [workers_list, setList] = useState([]);
    const [current_worker, setWorker] = useState(0);
    const [current_password, setPassword] = useState('');
    const outlet_list = franchise_data_store.outlets;

    useEffect(() => {
        const get_workers_list = async() => {
            const workers_list = await instance.get('/workers');
            return workers_list;
        }
        const workers_list = get_workers_list();
        setList(workers_list);
    }, []);

    const changeCashierData = async (formData) => {
        formData.set('id', workers_list[current_worker].cashier_id)
        await instance.post('/change_worker_data', formData).then((response) => {
            alert(response.data);
        })
    };

    return (
        <div style={{marginRight: "150px"}}>
            {outlet_list !== undefined && workers_list.length != 0?
            <form action={changeCashierData} style={{...interface_styles.dish_card_list, ...interface_styles.card_grid_two}}>
                <select style={{...interface_styles.select, borderColor: interface_colors.select_border_color}} 
                    id="id" name="id" value={current_worker}
                    onChange={(event) => setWorker(event.target.value)}>
                        {workers_list.map((item, index) => (
                            <option value={index}>{item.cashier_id}</option>
                    ))}
                    </select>
                <input style={input} type="text" name="name" defaultValue={workers_list[current_worker].name} maxLength={12}/>
                <input style={input} type="text" name="surname" defaultValue={workers_list[current_worker].surname} maxLength={36}/>
                <select style={select} className="settings" name="outlet" defaultValue={workers_list[current_worker].outlet_id}>
                    {outlet_list.map((item, index) => (
                        <option value={item.outlet_id}>{item.address}</option>))}
                </select>
                <input style={input} type="text" name="password" value={current_password} 
                    onChange={(event) => setPassword(event.target.value)} maxLength={30}/>
                {current_password.length > 0 ? <Button text={"Зарегистрировать"} main_style={button} hover_style={button_hover}/>
                :null}
            </form>:
            <h1>Вы ещё не внесли в перечень ни одно заведение!</h1>
        }
        </div> 
    )
}

export default CashierDataChangeTab;