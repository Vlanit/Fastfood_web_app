import { franchise_data_store } from "../../state/FranchiseDataState";
import { observer } from 'mobx-react-lite';
import { useState } from "react";

import OutletInfo from "./OutletInfo";
import Button from "./Button";

const OutletsCustomizationTab = observer((props) => {
    const [add_new_outlet, addOutlet] = useState(false);

    const insertNewOutlet = async (formData) => {
        await instance.post('/add_new_outlet', formData).then((response) => {
            alert(response.data.result);
        })
    };

    return (
        <div>
            <h1>Заведения</h1>
            {
                franchise_data_store.outlets.map((item) => 
                    <OutletInfo town={item.town} distinct={item.distinct} address={item.address}/>
                )
            }
            {add_new_outlet?
                <form action={insertNewOutlet}>
                    <div>
                        <input type="text" name="town" defaultValue={"Город"}/>
                        <p>{'('}</p>
                        <input type="text" name="district" defaultValue={"Район"}/>
                        <p>{')'}</p>
                    </div>
                    <input type="text" name="address" defaultValue={"Адрес"}/>
                    <button type="submit">Добавить</button>
                </form>
            :null}
            <Button text={"Добавить заведение"} main_style={{...buttonStyle, ...interface_styles.small}}
                hover_style={{...buttonHoverStyle, ...interface_styles.small}} onClick={()=>props.button_action()}/>
        </div>
    )
});

export default OutletsCustomizationTab;