const express = require('express');
const http = require('http');
const session = require("express-session")
const socket_io = require('socket.io');
const client_pool = require('./database/pool.js');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const port = process.env.APP_PORT;
const session_app = session({
    secret: process.env.APP_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        httpOnly: true,
        secure: true,
    },
});

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3001'],
    credentials: true
}));
app.use('/api/images', express.static('files/images'));
app.use(session_app);

const server = http.createServer(app);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'files/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now().toString() + file.fieldname + path.extname(file.originalname));
    }
})

let order_store = new Map();

const file_uploader = multer({storage:storage});

app.get('/api/actions', async (req, res) => {
    try {
        const list_of_actions = await client_pool.query("select * from action");
        res.json(list_of_actions.rows);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error:'Something went wrong when trying to get actions!'});
    }
});

app.get('/api/toppings', async (req, res) => {
    try {
        const list_of_toppings = await client_pool.query("select * from topping");
        res.json(list_of_toppings.rows);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error:'Something went wrong when trying to get toppings!'});
    }
});

app.get('/api/dishes', async (req, res) => {
    try {
        const list_of_dishes = await client_pool.query("select dish_id, name, price, image_path, discount, to_char(discount_end_date, 'DD.MM.YYYY') as end_date, dough_type from dish order by dish_id;");
        const list_of_dish_toppings = await client_pool.query("select dish.dish_id, array_to_string( array_agg( distinct topping.name ), ', ' ) as description from dish inner join dish_topping on dish.dish_id=dish_topping.dish_id inner join topping on dish_topping.topping_id=topping.topping_id group by dish.dish_id");
        const merge_data = list_of_dishes.rows.map((dish, index) => {
            return { ...dish, description: list_of_dish_toppings.rows[index].description };
        });
        res.json(merge_data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error:'Something went wrong when trying to get dishes!'});
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const list_of_products = await client_pool.query("select * from product");
        res.json(list_of_products.rows);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error:'Something went wrong when trying to get products!'});
    }
});

app.get('/api/outlets', async (req, res) => {
    try {
        const list_of_outlets = await client_pool.query("select * from outlet");
        res.json(list_of_outlets.rows);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error:'Something went wrong when trying to get outlets list!'});
    }
});

app.get('/api/towns', async (req, res) => {
    try {
        const list_of_towns = await client_pool.query("select distinct town from outlet");
        res.json(list_of_towns.rows);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error:'Something went wrong when trying to get towns list!'});
    }
});

app.get('/api/full_data', async (req, res) => {
    try {
        const list_of_dishes = await client_pool.query("select dish_id, name, price, image_path, discount, to_char(discount_end_date, 'DD.MM.YYYY') as end_date, dough_type from dish order by dish_id;");
        const list_of_dish_toppings = await client_pool.query("select dish.dish_id, array_to_string( array_agg( distinct topping.name ), ', ' ) as description from dish inner join dish_topping on dish.dish_id=dish_topping.dish_id inner join topping on dish_topping.topping_id=topping.topping_id group by dish.dish_id");
        const merge_data = list_of_dishes.rows.map((dish, index) => {
            return { ...dish, description: list_of_dish_toppings.rows[index].description };
        });
        const list_of_products = await client_pool.query("select * from product");
        const list_of_actions = await client_pool.query("select * from action");
        const list_of_toppings = await client_pool.query("select * from topping");
        res.json({actions: list_of_actions.rows, dishes: merge_data, other_products: list_of_products.rows, toppings: list_of_toppings.rows});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error:'Something went wrong when trying to get the menu!'});
    }
});

app.get('/api/active_orders_by_outlet', async (req, res) => {
    try {
        const data = req.query;
        const list_of_orders = await client_pool.query(`select * from customer_order where isfinished = 0 and outlet_id = $1`, [data.outlet]);
        const list_of_dishes = await client_pool.query(`select dish_order.dish_id, dish_order.order_id, dish_order.size, dish_order.count, 
            dish_order.current_price from dish_order 
            inner join customer_order on dish_order.order_id=customer_order.order_id where isfinished = 0 and outlet_id = $1`, 
            [data.outlet]);
        const list_of_products = await client_pool.query(`select product_order.product_id, product_order.order_id, product_order.count from product_order 
            inner join customer_order on product_order.order_id=customer_order.order_id where isfinished = 0 and outlet_id = $1`, 
            [data.outlet]);
        const merge_data = list_of_orders.rows.map((order, index) => {
            let dishes_order = list_of_dishes.rows.map((dish, index) => {
                if (dish.order_id == order.order_id)
                    return dish;
            });
            let products_order = list_of_products.rows.map((product, index) => {
                if (product.product_id == order.order_id)
                    return product;
            });
            return { ...order, dishes: dishes_order, products: products_order };
        });
        res.json({orders: merge_data});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error:'Something went wrong when trying to get orders list!'});
    }
});

app.get('/api/about', (req, res) => {
    const file_path = __dirname + '/business-config.json';
    const file = fs.readFileSync(file_path);
    res.json(JSON.parse(file));
});

app.get('/api/get_interface_data', (req, res) => {
    const interface_file_path = __dirname + '/interface-config.json';
    const interface_file = fs.readFileSync(interface_file_path);
    const interface_file_json = JSON.parse(interface_file);
    const layout_file_path = __dirname + `/interface-layout${interface_file_json.layout_num}.json`;
    const design_layout = fs.readFileSync(layout_file_path);
    const design_layout_json = JSON.parse(design_layout);
    res.json({colors: interface_file_json, styles: design_layout_json});
});

app.get('/api/get_order_from_store', (req, res) => {
    const id = req.query.order_id;
    res.json({order: order_store.get(id)});
});

app.post('/api/save_order_to_store', (req, res) => {
    const data = req.body;
    if (!order_store.has(data.order_id))
    {
        order_store.set(data.order_id, data.order_data);
    }
    res.json({order_id: data.order_id});
});

app.post('/api/add_topping', file_uploader.single('image'), async (req, res) => {
    try {
        const data = req.body;
        await client_pool.query(`insert into topping(name, type, price, image_path, ismeaty, isspicy) values($1, $2, $3, $4, $5, $6)`, 
            [data.name, data.type, data.price, req.file.filename, (data.ismeaty=='on'?1:0), (data.isspicy=='on'?1:0)]);
        res.json({result: "Topping is added!"});
    }
    catch (error) {
        console.error(error.stack);
        res.status(500).json({error:'Something went wrong when trying to add new topping!'});
    }
});

app.post('/api/add_dish', file_uploader.single('image'), async (req, res) => {
    try {
        const data = req.body;
        await client_pool.query(`insert into dish(name, price, image_path, dough_type) values($1, $2, $3, $4)`, 
            [data.name, data.price, req.file.filename, (data.dough_type=='on'?1:0)]);
        const inserted_dish_id = (await client_pool.query("select last_value from dish_id_seq")).rows[0].last_value;
        const toppings_array = Object.keys(data);
        await toppings_array.forEach(async (element) => {
            if (data[element] == 'on')
                await client_pool.query(`insert into dish_topping(topping_id, dish_id) values($1, $2)`, 
                    [element, inserted_dish_id]);
        })
        res.json({result: "Dish is added!"});
    }
    catch (error) {
        console.error(error.stack);
        res.status(500).json({error:'Something went wrong when trying to add dish!'});
    }
});

app.post('/api/add_product', file_uploader.single('image'), async (req, res) => {
    try {
        const data = req.body;
        await client_pool.query(`insert into product(name, price, image_path, description, type) values($1, $2, $3, $4, $5)`, 
            [data.name, data.price, req.file.filename, data.description, data.type]);
        res.json({result: "Product is added!"});
    }
    catch (error) {
        console.error(error.stack);
        res.status(500).json({error:'Something went wrong when trying to add product!'});
    }
});

app.post('/api/add_outlet', async (req, res) => {
    try {
        const data = req.body;
        await client_pool.query(`insert into outlet(town, address, district) values($1, $2, $3)`, 
            [data.town, data.address, data.district]);
        res.json({result: "Outlet is added!"});
    }
    catch(error) {
        console.error(error.stack);
        res.status(500).json({error:'Something went wrong when trying to add outlet!'});
    }
});

app.post('/api/change_interface_data', async (req, res) => {
    try {
        const interface_file_path = __dirname + '/interface-config.json';
        fs.writeFileSync(interface_file_path, JSON.stringify(req.body));
        res.json({result: "Data of the interface has been changed"});
    }
    catch(error) {
        console.error(error.stack);
        res.status(500).json({error:'Something went wrong when trying to change color data of interface!'});
    }
});

app.post('/api/change_business_data', file_uploader.array('image'), async (req, res) => {
    try {
        const data = req.body;
        let form_data = {};
        form_data['logo'] = req.files[0].filename;
        form_data['about_us'] = {
            title: data.about_us_title,
            text: data.about_us_text,
            image: req.files[1].filename
        };
        form_data['about_production'] = {
            title: data.about_production_title,
            text: data.about_production_text,
            image: req.files[2].filename
        };
        form_data['contact_info'] = {
            person: data.contact_person,
            phone: data.contact_phone,
            email: data.contact_email,
            image: req.files[3].filename
        }
        form_data['fact_info'] = {
            array: [],
            image: req.files[4].filename
        };
        for (let i = 0; i < data.number_facts_count; i++) {
            form_data['fact_info'].array.push({
                number: data[`number_fact_${i}`],
                text: data[`text_fact_${i}`]
            });
        };
        const interface_file_path = __dirname + '/business-config.json';
        fs.writeFileSync(interface_file_path, JSON.stringify(form_data));
        res.json({result: "Data of your business has been changed"});
    }
    catch(error) {
        console.error(error.stack);
        res.status(500).json({error:'Something went wrong when trying to change color data of interface!'});
    }
});

app.get('/api/login', async (req, res) => {
    try {
        if (req.query.login == process.env.ADMIN_ACCOUNT) {
            const compare_data = await bcrypt.compare(req.query.password, process.env.ADMIN_PASSWORD);
            if (compare_data) {
                res.json({ error: false, admin: true});
            }
            else {
                res.json({error: true, result: "Не верный пароль"});
            }
        }
        const user_data = await client_pool.query(`select * from account where login = $1`, [req.query.login]);
        if (user_data.rows.length == 0) {
                const cashier_data = await client_pool.query(`select * from cashier_account where login = $1`, [req.query.login]);
                if (cashier_data.rows.length == 0) {
                    res.json({error: true, result: "Не верный логин"});
                }
                else {
                    const compare_data = await bcrypt.compare(req.query.password, cashier_data.rows[0].password);
                    if (compare_data) {
                        res.json({ error: false, cashier: true, user_data: cashier_data.rows[0]});
                    }
                    else {
                        res.json({error: true, result: "Не верный пароль"});
                    }
                }
            }
        else {
            const compare_data = await bcrypt.compare(req.query.password, user_data.rows[0].password);
            if (compare_data) {
                res.json({ error: false, user_data: user_data.rows[0]});
            }
            else {
                res.json({error: true, result: "Не верный логин"});
            }
        }
    }
    catch(err) {
        res.status(500).json({error:'Something went wrong when trying to login user!'});
    }
});

app.post('/api/register_new_client', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashed_password = await bcrypt.hash(req.body.password, salt);
        const data = req.body;
        const same_user_logins = await client_pool.query(`select * from account where login = $1`, [data.login]);
        const same_cashier_logins = await client_pool.query(`select * from cashier_account where login = $1`, [data.login]);
        if (same_user_logins.rows.length == 0 && same_cashier_logins.rows.length == 0 && data.login != process.env.ADMIN_ACCOUNT) {
            await client_pool.query(`insert into account(image_path, name, surname, coins, town, address, login, password) values($1, $2, $3, 0, $4, $5, $6, $7)`, [imagepath, data.name, data.surname, data.town, data.address, data.login, hashed_password]);
            res.json({result: "New client is registered."});
        }
        else {
            res.json({result: "This login is already in use!"});
        }
    }
    catch {
        res.status(500).json({error:'Something went wrong when trying to register user!'});
    }
});

app.post('/api/register_new_cashier', async (req, res) => {
    try {
        const data = req.body;
        const salt = await bcrypt.genSalt();
        const hashed_password = await bcrypt.hash(data.password, salt);
        const same_user_logins = await client_pool.query(`select * from account where login = $1`, [data.login]);
        const same_cashier_logins = await client_pool.query(`select * from cashier_account where login = $1`, [data.login]);
        if (same_user_logins.rows.length == 0 && same_cashier_logins.rows.length == 0 && data.login != process.env.ADMIN_ACCOUNT) {
            await client_pool.query(`insert into cashier_account(name, surname, outlet_id, login, password) values($1, $2, $3, $4, $5)`, 
                [data.name, data.surname, data.outlet, data.login, hashed_password]);
            res.json({result: "New cashier is registered."});
        }
        else {
            res.json({result: "This login is already in use!"});
        }
    }
    catch {
        res.status(500).json({error:'Something went wrong when trying to register user!'});
    }
});

app.post('/api/update_business_data', file_uploader.single('image', (req, res) => {
    const fs = require('fs');
    const file = require('business-config.json');


}));

server.listen(port, () => {
    console.log(`Server is now running on port ${port}`);
});

const socket_server = socket_io(server, {cors:{origin:'*',}});
socket_server.engine.use(session_app);

socket_server.on('connection', (socket) => {
    console.log(`${socket.id} is connected`);

    socket.on('disconnect', (socket) => {
        console.log(`${socket.id} has disconnected`);
    });

    socket.on('join_room', (room) => {
        socket.join(`outlet-${room}`);
    });

    socket.on('new_order_inserted', async (order_data) => {

        await client_pool.query(`insert into customer_order(
	        name, surname, devivery, delivery_address, iscooked, isfinished, order_datetime, account_id, outlet_id, isstarted)
	        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
                [order_data.name, order_data.surname, 
                    order_data.delivery ? 1 : 0, 
                    order_data.delivery_address, 
                    order_data.iscooked ? 1 : 0, 
                    order_data.isfinished ? 1 : 0, 
                    order_data.order_datetime, 
                    order_data.account_id, 
                    order_data.outlet_id, 
                    order_data.isstarted ? 1 : 0]);
            
        let last_value = await client_pool.query(`select last_value from customer_order_order_id_seq`);
        let last_order_id = last_value.rows[0].last_value;

        await order_data.dishes?.forEach(async (element) => {
                await client_pool.query(`insert into dish_order(
                    dish_id, order_id, size, count, current_price)
                    values ($1, $2, $3, $4, $5);`, 
                    [element.dish_id, last_order_id, element.size, element.count, element.current_price]);
        });

        await order_data.products?.forEach(async (element) => {
            await client_pool.query(`insert into product_order(
                    product_id, order_id, count)
                    values ($1, $2, $3);`,
                [element.product_id, last_order_id, element.count]);
        }); 

        const order_with_client = {...order_data, order_id: last_order_id, client: socket.id};
        socket_server.to(`outlet-${order_data.outlet}`).emit('new_order', order_with_client);
    });

    socket.on('order_status_changed', async (order_status) => {
        await client_pool.query(`update customer_order
            set isstarted=$1, iscooked=$2, isfinished=$3 where order_id=$4;`,
            [order_data.isstarted, order_data.iscooked, order_data.isfinished, order_data.order_id]);

        socket_server.in(order_status.client).emit('new_order_state', order_status);
    })
});