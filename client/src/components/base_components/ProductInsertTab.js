import instance from '../../api/server_api';

function ProductInsertTab(props) {

    const insertProduct = async (formData) => {
        await instance.post('/add_product', formData).then((response) => {
            alert(response.data);
        })
    };

    return (
        <div>
            <form action = {insertProduct}>
                <input type="text" name="name" maxLength={40}/>
                <select className="settings" name="type" defaultValue={1}>
                    <option value={1}>Закуска</option>
                    <option value={2}>Напиток</option>
                </select>
                <input type="number" name="price" defaultValue={0}/>
                <input type="file" name="image" accept="image/*"/>
                <input type="text" name="description" maxLength={150}/>
                <button type="submit"> Добавить </button>
            </form>
        </div>
    )
}

export default ProductInsertTab;