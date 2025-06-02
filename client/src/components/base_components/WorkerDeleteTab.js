import instance from '../../api/server_api';
import { useState } from 'react';
import { interface_styles, button, button_hover } from '../../styles/ColorData';
import Button from "./Button";

function WorkerDeleteTab(props) {
    const [workers_list, setList] = useState([]);
    const [current_worker, setWorker] = useState(0);

    useEffect(() => {
        const get_workers_list = async() => {
            const workers_list = await instance.get('/workers');
            return workers_list;
        }
        const workers_list = get_workers_list();
        setList(workers_list);
    }, []);

    const deleteWorker = async (formData) => {
        await instance.delete('/delete_worker', {id: workers_list[current_worker].cashier_id}).then((response) => {
            alert(response.data);
        })
    };

    return (
        <div style={{marginRight: "150px"}}>
            {workers_list.length != 0?
                <form action = {deleteWorker} style={{...interface_styles.dish_card_list, ...interface_styles.card_grid_two}}>
                <select style={{...interface_styles.select, borderColor: interface_colors.select_border_color}} 
                    id="id" name="id" value={current_worker}
                    onChange={(event) => setWorker(event.target.value)}>
                        {workers_list.map((item, index) => (
                            <option value={index}>{item.name} {item.surname}</option>
                    ))}
                    </select>
                <Button text={"Удалить"} main_style={button} hover_style={button_hover}/>
                </form>
                :null}
        </div>
    )
}

export default WorkerDeleteTab;