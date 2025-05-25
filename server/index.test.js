const client_pool = require('./database/pool.js');
const supertest = require('supertest');
const jestSchema = require('jest-json-schema');

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

describe('API-запросы с активной базой данных', () => {
    const app = require('./api-server.js')(client_pool);
    
    it('Запрос должен вернуть список акций из базы данных', async () => {
        const response = await supertest(app).get('/api/actions');
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
        response.body.forEach(element => {
            expect(element).toMatchSchema(actionSchema); 
        });
    });

    it('Запрос должен вернуть список ингредиентов из базы данных', async () => {
        const response = await supertest(app).get('/api/toppings');
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
        response.body.forEach(element => {
            expect(element).toMatchSchema(toppingSchema); 
        });
    });

    it('Запрос должен вернуть список блюд из базы данных', async () => {
        const response = await supertest(app).get('/api/dishes');
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
        response.body.forEach(element => {
            expect(element).toMatchSchema(dishSchema); 
        });
    });

    it('Запрос должен вернуть список продуктов из базы данных', async () => {
        const response = await supertest(app).get('/api/products');
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
        response.body.forEach(element => {
            expect(element).toMatchSchema(productSchema); 
        });
    });

    it('Запрос должен вернуть список заведений из базы данных', async () => {
        const response = await supertest(app).get('/api/outlets');
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
        response.body.forEach(element => {
            expect(element).toMatchSchema(outletSchema); 
        });
    });

    it('Запрос должен вернуть список городов из базы данных', async () => {
        const response = await supertest(app).get('/api/towns');
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
        response.body.forEach(element => {
            expect(typeof(element)).toBe('string');
        });
    });

    it('Запрос должен вернуть список основных данных из базы данных', async () => {
        const response = await supertest(app).get('/api/full_data');
        expect(response.status).toBe(200);
        expect(response.body).toMatchSchema(fullDataSchema);
        response.body.actions.forEach(element => {
            expect(element).toMatchSchema(actionSchema);
        });
        response.body.dishes.forEach(element => {
            expect(element).toMatchSchema(dishSchema);
        });
        response.body.other_products.forEach(element => {
            expect(element).toMatchSchema(productSchema);
        });
        response.body.toppings.forEach(element => {
            expect(element).toMatchSchema(toppingSchema);
        });
    });

    it('Запрос должен вернуть список заказов 1-го заведения из базы данных', async () => {
        const response = await supertest(app).get('/api/active_orders_by_outlet?outlet=1');
        expect(response.status).toBe(200);
        expect(typeof(response.body)).toBe('object');
        response.body.forEach(element => {
            expect(typeof(element)).toMatchSchema(orderSchema);
        });
    });

    it('Запрос должен вернуть информацию о заведениях франшизы', async () => {
        const response = await supertest(app).get('/api/about');
        expect(response.status).toBe(200);
        expect(typeof(element)).toMatchSchema(aboutSchema);
    });

    it('Запрос должен вернуть данные интерфейса', async () => {
        const response = await supertest(app).get('/api/get_interface_data');
        expect(response.status).toBe(200);
        expect(typeof(element)).toMatchSchema(interfaceDataSchema);
    });

    it('Запрос должен вернуть данные пользователя', async () => {
        const response = await supertest(app).get('/api/login');
        expect(response.status).toBe(200);
        expect(typeof(element)).toMatchSchema(interfaceDataSchema);
    });
});