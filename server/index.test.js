const client_pool = require('./database/pool.js');
const supertest = require('supertest');
const jestSchema = require('jest-json-schema');

expect.extend(jestSchema.matchers);

    jest.mock('./database/pool.js', () => {
        const mockedClient = {
            query: jest.fn(() => {return {rows: []}})
        };
        return mockedClient;
    });

const actionSchema = {  
    action_id: 'number',
    name: 'string',
    image_path: 'string',
    description: 'string',
    action_end_date: 'string'
};

const toppingSchema = {  
    topping_id: 'number',
    name: 'string',
    price: 'number',
    image_path: 'string',
    ismeaty: 'number',
    isspicy: 'number',
    type: 'number',
    constructor_image: 'string'
};

const dishSchema = {  
    dish_id: 'number', 
    name: 'string', 
    price: 'number', 
    image_path: 'string', 
    discount: 'number', 
    end_date: 'string', 
    dough_type: 'number',
    description: 'string'
};

const productSchema = {  
    product_id: 'number', 
    name: 'string', 
    price: 'number', 
    image_path: 'string', 
    discount: 'number', 
    discount_end_date: 'string', 
    description: 'string',
    type: 'number'
};

const outletSchema = {  
    outlet_id: 'number',
    district: 'string',
    town: 'string',
    address: 'string'
};

const fullDataSchema = {
    actions: 'object', 
    dishes: 'object', 
    other_products: 'object', 
    toppings: 'object'
};

const orderSchema = {
    order_id: 'number',
    name: 'string',
    surname: 'string',
    devivery: 'string',
    delivery_address: 'string',
    iscooked: 'number',
    isfinished: 'number',
    order_datetime: 'string',
    account_id: 'number',
    outlet_id: 'number',
    isstarted: 'number',
    dishes: 'object',
    products: 'object'
};

const aboutSchema = {
    logo: 'string',
    about_us: {
        title:'string',
        text:'string',
        image:'string'
    },
    about_production: {
        title: 'string',
        text: 'string',
        image: 'string'
    },
    contact_info: {
        person: 'string',
        phone: 'string',
        email: 'string',
        image: 'string'
    },
    fact_info: {
        array: 'object',
        image: 'string'
    }
};

const interfaceDataSchema = {
    colors: 'object',
    styles: 'object'
};

describe('Положительные тесты', () => {

    const app = require('./api-server.js')(client_pool);
    
    it('Запрос должен вернуть список акций из базы данных', async () => {
        const response = await supertest(app).get('/api/actions');
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
    });

    it('Запрос должен вернуть список ингредиентов из базы данных', async () => {
        const response = await supertest(app).get('/api/toppings');
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
    });

    it('Запрос должен вернуть список блюд из базы данных', async () => {
        const response = await supertest(app).get('/api/dishes');
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
    });

    it('Запрос должен вернуть список продуктов из базы данных', async () => {
        const response = await supertest(app).get('/api/products');
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
    });

    it('Запрос должен вернуть список заведений из базы данных', async () => {
        const response = await supertest(app).get('/api/outlets');
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
    });

    it('Запрос должен вернуть список городов из базы данных', async () => {
        const response = await supertest(app).get('/api/towns');
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
    });

    it('Запрос должен вернуть список основных данных из базы данных', async () => {
        const response = await supertest(app).get('/api/full_data');
        expect(response.status).toBe(200);
        expect(response.body).toMatchSchema(fullDataSchema);
    });

    it('Запрос должен вернуть список заказов 1-го заведения из базы данных', async () => {
        const response = await supertest(app).get('/api/active_orders_by_outlet?outlet=1');
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
    });

    it('Запрос должен вернуть информацию о заведениях франшизы', async () => {
        const response = await supertest(app).get('/api/about');
        expect(response.status).toBe(200);
        expect(response.body).toMatchSchema(aboutSchema);
    });

    it('Запрос должен вернуть данные интерфейса', async () => {
        const response = await supertest(app).get('/api/get_interface_data');
        expect(response.status).toBe(200);
        expect(response.body).toMatchSchema(interfaceDataSchema);
    });

    it('Проверка запроса на добавление в базу данных нового ингредиента', async () => {
        const response = await supertest(app).post('/api/add_topping').send(
            {name: 'test_name', type: 0, price: 0, ismeaty: 'on', isspicy: 'off', filename: 'test_filename'}
        );
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
        expect(response.body.result).toBe('Ингредиент добавлен!');
    });

    it('Проверка запроса на добавление в базу данных нового блюда', async () => {
        const response = await supertest(app).post('/api/add_dish').send( 
            {name: 'test_name', price: 0, dough_type: 0, filename: 'test_filename'}
        );
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
        expect(response.body.result).toBe('Блюдо добавлено!');
    });

    it('Проверка запроса на добавление в базу данных нового продукта', async () => {
        const response = await supertest(app).post('/api/add_product').send(
            {name: 'test_name', price: 0, description: 'test_description', type: 0, filename: 'test_filename'}
        );
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
        expect(response.body.result).toBe("Товар был добавлен!");
    });

    it('Проверка запроса на добавление в базу данных нового заведения во франшизу', async () => {
        const response = await supertest(app).post('/api/add_outlet').send( 
            {town: 'test_name', address: 'test_address', district: 'test_district'}
        );
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
        expect(response.body.result).toBe("Заведение было добавлено");
    });

    it('Проверка запроса на изменение данных интерфейса', async () => {
        const response = await supertest(app).post('/api/change_interface_data').send(
            {}
        );
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
        expect(response.body.result).toBe("Данные интерфейса были изменены!");
    });

    it('Проверка запроса на изменение данных бизнеса', async () => {
        const response = await supertest(app).post('/api/change_business_data').send( 
            { about_us_title: 'string', about_us_text: 'string', about_production_title: 'string', about_production_text: 'string', contact_person: 'string', contact_phone: 'string', contact_email: 'string', number_facts_count: 0 }
        );
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
        expect(response.body.result).toBe("Данные бизнеса были изменены!");
    });

    it('Проверка запроса на добавление в базу данных нового клиента', async () => {
        const response = await supertest(app).post('/api/register_new_client').send( 
            {login: 'test_login', password: 'test_password', name: 'test_name', surname: 'test_surname', town: 'test_town', address: 'test_password'}
        );
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
        expect(response.body.result).toBe("Новый клиент зарегистрирован");
    });

    it('Проверка запроса на добавление в базу данных нового работника', async () => {
        const response = await supertest(app).post('/api/register_new_cashier').send( 
            {login: 'test_login', password: 'test_password', name: 'test_name', surname: 'test_surname', outlet: 0}
        );
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
        expect(response.body.result).toBe("Новый кассир был зарегистрирован!");
    });
});