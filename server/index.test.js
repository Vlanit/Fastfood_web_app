const supertest = require('supertest');
const jestSchema = require('jest-json-schema');
const bcrypt = require('bcrypt');
require('dotenv').config();

expect.extend(jestSchema.matchers);

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

const errorSchema = {
    error: 'string'
}

const errorLoginSchema = {
    error: 'string',
    result: 'string'
}

describe('Положительные тесты', () => {

    const client_pool = 
    {
        query: jest.fn(() => {return {rows: []}})
    };

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

describe('Негативные тесты', () => {
    
    const client_pool = {
        query: jest.fn(async (string, array) => {
            if (string.includes('insert')) {
                throw new Error("database PizzeriaDB doesn't exist");
            }
            else {
                const salt = await bcrypt.genSalt();
                if (string.includes('select * from account')) {
                    if (array[0] == 'test_client') {
                        const hashed_password = await bcrypt.hash('test_password', salt);
                        return {rows: [{password: hashed_password}]};
                    }
                    else {
                        return {rows: []};
                    }
                }
                else if (string.includes('select * from cashier_account')) {
                    if (array[0] == 'test_worker') {
                        const hashed_password = await bcrypt.hash('worker_password', salt);
                        return {rows: [{password: hashed_password}]};
                    }
                    else {
                        return {rows: []};
                    }
                }
                else {
                    throw new Error("database PizzeriaDB doesn't exist");;
                }
            }
        })};

    const error_pool = {
        query: jest.fn(async (string, array) => {
                throw new Error("database PizzeriaDB doesn't exist");
            }
        )};

    //Обращение к базе данных всегда возвращает данные при запросах данных о пользователях
    const app = require('./api-server.js')(client_pool);
    //Обращение к базе данных всегда возвращает ошибку
    const error_app = require('./api-server.js')(error_pool);
    
    it('Симуляция проблем с соендинением  при запросе акций', async () => {
        const response = await supertest(error_app).get('/api/actions');
        expect(response.status).toBe(500);
        expect(typeof(response.body)).toBe('object');
        expect(response.body).toMatchSchema(errorSchema);
        expect(response.body.error).toBe('Что-то пошло не так!');
    });

    it('Симуляция проблем с соендинением  при запросе ингредиентов', async () => {
        const response = await supertest(error_app).get('/api/toppings');
        expect(response.status).toBe(500);
        expect(typeof(response.body)).toBe('object');
        expect(response.body).toMatchSchema(errorSchema);
        expect(response.body.error).toBe('Что-то пошло не так!');
    });

    it('Симуляция проблем с соендинением  при запросе блюд', async () => {
        const response = await supertest(error_app).get('/api/dishes');
        expect(response.status).toBe(500);
        expect(typeof(response.body)).toBe('object');
        expect(response.body).toMatchSchema(errorSchema);
        expect(response.body.error).toBe('Что-то пошло не так!');
    });

    it('Симуляция проблем с соендинением  при запросе продуктов', async () => {
        const response = await supertest(error_app).get('/api/products');
        expect(response.status).toBe(500);
        expect(typeof(response.body)).toBe('object');
        expect(response.body).toMatchSchema(errorSchema);
        expect(response.body.error).toBe('Что-то пошло не так!');
    });

    it('Симуляция проблем с соендинением  при запросе заведений', async () => {
        const response = await supertest(error_app).get('/api/outlets');
        expect(response.status).toBe(500);
        expect(typeof(response.body)).toBe('object');
        expect(response.body).toMatchSchema(errorSchema);
        expect(response.body.error).toBe('Что-то пошло не так!');
    });

    it('Симуляция проблем с соендинением  при запросе городов', async () => {
        const response = await supertest(error_app).get('/api/towns');
        expect(response.status).toBe(500);
        expect(typeof(response.body)).toBe('object');
        expect(response.body).toMatchSchema(errorSchema);
        expect(response.body.error).toBe('Что-то пошло не так!');
    });

    it('Симуляция проблем с соендинением  при запросе полной информации для главной страницы', async () => {
        const response = await supertest(error_app).get('/api/full_data');
        expect(response.status).toBe(500);
        expect(typeof(response.body)).toBe('object');
        expect(response.body).toMatchSchema(errorSchema);
        expect(response.body.error).toBe('Что-то пошло не так!');
    });

    it('Симуляция проблем с соендинением  при запросе заказов', async () => {
        const response = await supertest(error_app).get('/api/active_orders_by_outlet');
        expect(response.status).toBe(500);
        expect(typeof(response.body)).toBe('object');
        expect(response.body).toMatchSchema(errorSchema);
        expect(response.body.error).toBe('Что-то пошло не так!');
    });

    it('Попытка получить данные клиента с неверным паролем', async () => {
        const response = await supertest(app).get('/api/login?login=test_client&password=123');
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
        expect(response.body).toMatchSchema(errorLoginSchema);
    });

    it('Попытка получить данные клиента с логином, которого нет в БД', async () => {
        const response = await supertest(app).get('/api/login?login=new_login&password=test_password');
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
        expect(response.body).toMatchSchema(errorLoginSchema);
    });

    it('Попытка получить данные работника с неверным паролем', async () => {
        const response = await supertest(app).get('/api/login?login=test_worker&password=123');
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
        expect(response.body).toMatchSchema(errorLoginSchema);
    });

    it('Попытка получить данные администратора с неверным паролем', async () => {
        const response = await supertest(app).get(`/api/login?login=${process.env.ADMIN_ACCOUNT}&password=123`);
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
        expect(response.body).toMatchSchema(errorLoginSchema);
    });

    it('Симуляция проблем с соендинением  при запросе авторизации', async () => {
        const response = await supertest(error_app).get('/api/login?login=test_admin&password=admin_password');
        expect(response.status).toBe(500);
        expect(typeof(response.body)).toBe('object');
        expect(response.body.error).toBe('Что-то пошло не так!');

    });
    
    it('Симуляция проблем с соендинением  при попытке добавить в БД новый ингредиент для блюд', async () => {
        const topping_data = new FormData();
        topping_data.append('name', 'test_name');
        topping_data.append('type', 0);
        topping_data.append('price', 0);
        topping_data.append('ismeaty', 'on');
        topping_data.append('isspicy', 'off');
        topping_data.append('filename', 'test_image');
        const response = await supertest(error_app).post('/api/add_topping').send(topping_data);
        expect(response.status).toBe(500);
        expect(typeof(response.body)).toBe('object');
        expect(response.body).toMatchSchema(errorSchema);
        expect(response.body.error).toBe('Что-то пошло не так!');
    });

    it('Симуляция проблем с соендинением  при попытке добавить в БД новое блюдо', async () => {
        const dish_data = new FormData();
        dish_data.append('name', 'test_name');
        dish_data.append('price', 0);
        dish_data.append('dough_type', 0);
        dish_data.append('ingredient', 'on');
        dish_data.append('filename', 'test_image');
        const response = await supertest(error_app).post('/api/add_dish').send(dish_data);
        expect(response.status).toBe(500);
        expect(typeof(response.body)).toBe('object');
        expect(response.body).toMatchSchema(errorSchema);
        expect(response.body.error).toBe('Что-то пошло не так!');
    });

    it('Симуляция проблем с соендинением  при попытке добавить в БД новый продукт', async () => {
        const product_data = new FormData();
        product_data.append('name', 'test_name');
        product_data.append('price', 0);
        product_data.append('description', 'test_description');
        product_data.append('type', 0);
        product_data.append('filename', 'test_image');
        const response = await supertest(error_app).post('/api/add_product').send(product_data);
        expect(response.status).toBe(500);
        expect(typeof(response.body)).toBe('object');
        expect(response.body).toMatchSchema(errorSchema);
        expect(response.body.error).toBe('Что-то пошло не так!');
    });

    it('Симуляция проблем с соендинением  при попытке добавить в БД новое заведение', async () => {
        const response = await supertest(error_app).post('/api/add_outlet').send(
            {town: 'test_name', address: 'test_address', district: 'test_district'}
        );
        expect(response.status).toBe(500);
        expect(typeof(response.body)).toBe('object');
        expect(response.body).toMatchSchema(errorSchema);
        expect(response.body.error).toBe('Что-то пошло не так!');
    });

    it('Попытка зарегистрировать нового клиента в БД с уже используемым логином', async () => {
        const response = await supertest(app).post('/api/register_new_client').send(
            {login: 'test_client', password: 'test_password', name: 'test_name', surname: 'test_surname', town: 'test_town', address: 'test_password'}
        );
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
        expect(response.body.result).toBe('Данный логин уже используется');
    });

    it('Симуляция проблем с соендинением  при попытке добавления нового клиента в БД', async () => {

        const response = await supertest(error_app).post('/api/register_new_client').send(
            {login: 'test_login', password: 'test_password', name: 'test_name', surname: 'test_surname', town: 'test_town', address: 'test_password'}
        );
        expect(response.status).toBe(500);
        expect(typeof(response.body)).toBe('object');
        expect(response.body).toMatchSchema(errorSchema);
        expect(response.body.error).toBe('Что-то пошло не так!');
    });

    it('Попытка зарегистрировать нового работника в БД с уже используемым логином', async () => {
        const response = await supertest(app).post('/api/register_new_cashier').send(
            {login: 'test_worker', password: 'test_password', name: 'test_name', surname: 'test_surname', outlet: 0}
        );
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
        expect(response.body.result).toBe('Данный логин уже используется!');
    });

    it('Симуляция проблем с соендинением  при попытке добавления нового работника в БД', async () => {
        const response = await supertest(error_app).post('/api/register_new_cashier').send(
            {login: 'test_login', password: 'test_password', name: 'test_name', surname: 'test_surname', outlet: 0}
        );
        expect(response.status).toBe(500);
        expect(typeof(response.body)).toBe('object');
        expect(response.body).toMatchSchema(errorSchema);
        expect(response.body.error).toBe('Что-то пошло не так!');
    });
});