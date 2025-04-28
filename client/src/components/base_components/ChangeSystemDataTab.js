import instance from '../../api/server_api';

function DishInsertTab(props) {

    const changeData = async (formData) => {
        await instance.post('/change_system_data', formData).then((response) => {
            alert(response.data);
        })
    };

    return (
        <div>
            <form action = {changeData}>
                <input type="text" name="name"/>
                <input type="text" name="about_us"/>
                <input type="file" name="logo" accept="image/*"/>
                <input type="number" name="fact_1_n" value={0}/>
                <input type="text" name="fact_1_t"/>
                <input type="number" name="fact_2_n" value={0}/>
                <input type="text" name="fact_2_t"/>
                <input type="number" name="fact_3_n" value={0}/>
                <input type="text" name="fact_3_t"/>
                <input type="number" name="fact_4_n" value={0}/>
                <input type="text" name="fact_4_t"/>
                <input type="number" name="fact_5_n" value={0}/>
                <input type="text" name="fact_5_t"/>
                <input type="number" name="fact_6_n" value={0}/>
                <input type="text" name="fact_6_t"/>
                <input type="number" name="max_orders_per_outlet" value={0}/>
                <button type="submit"> Добавить </button>
            </form>
        </div>
    )
}

export default DishInsertTab;