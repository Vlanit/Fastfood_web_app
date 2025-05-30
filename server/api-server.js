module.exports = function(db) {
    const express = require('express');
    const session = require("express-session")
    const bcrypt = require('bcrypt');
    const multer = require('multer');
    const path = require('path');
    const cors = require('cors');
    const fs = require('fs');
    require('dotenv').config();
    
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

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'files/images');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now().toString() + file.fieldname + path.extname(file.originalname));
        }
    })

    const file_uploader = multer({storage:storage});

    app.get('/api/actions', async (req, res) => {
        try {
            const list_of_actions = await db.query("select * from action");
            res.json(list_of_actions.rows);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({error:'Что-то пошло не так!'});
        }
    });

    app.get('/api/toppings', async (req, res) => {
        try {
            const list_of_toppings = await db.query("select * from topping");
            res.json(list_of_toppings.rows);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({error:'Что-то пошло не так!'});
        }
    });

    app.get('/api/dishes', async (req, res) => {
        try {
            const list_of_dishes = await db.query("select dish.dish_id, name, price, image_path, discount, to_char(discount_end_date, 'DD.MM.YYYY') as end_date, dough_type, jsonb_agg (dish_topping.topping_id) AS toppings from public.dish inner join dish_topping on dish.dish_id = dish_topping.dish_id group by dish.dish_id");
            res.json(list_of_dishes.rows);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({error:'Что-то пошло не так!'});
        }
    });

    app.get('/api/products', async (req, res) => {
        try {
            const list_of_products = await db.query("select * from product");
            res.json(list_of_products.rows);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({error:'Что-то пошло не так!'});
        }
    });

    app.get('/api/outlets', async (req, res) => {
        try {
            const list_of_outlets = await db.query("select * from outlet");
            res.json(list_of_outlets.rows);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({error:'Что-то пошло не так!'});
        }
    });

    app.get('/api/towns', async (req, res) => {
        try {
            const list_of_towns = await db.query("select distinct town from outlet");
            res.json(list_of_towns.rows);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({error:'Что-то пошло не так!'});
        }
    });

    app.get('/api/full_data', async (req, res) => {
        try {
            const list_of_dishes = await db.query("select dish.dish_id, name, price, image_path, discount, to_char(discount_end_date, 'DD.MM.YYYY') as end_date, dough_type, jsonb_agg (dish_topping.topping_id) AS toppings from public.dish inner join dish_topping on dish.dish_id = dish_topping.dish_id group by dish.dish_id");
            const list_of_products = await db.query("select * from product");
            const list_of_actions = await db.query("select * from action");
            const list_of_toppings = await db.query("select * from topping");
            res.json({actions: list_of_actions.rows, dishes: list_of_dishes.rows, other_products: list_of_products.rows, toppings: list_of_toppings.rows});
        }
        catch (err) {
            console.log(err);
            res.status(500).json({error:'Что-то пошло не так!'});
        }
    });

    app.get('/api/active_orders_by_outlet', async (req, res) => {
        try {
            const data = req.query;
            const list_of_orders = await db.query(`select * from customer_order where isfinished = 0 and outlet_id = $1`, [data.outlet]);
            const list_of_dishes = await db.query(`select dish_order.dish_id, dish_order.order_id, dish_order.size, dish_order.count, 
                dish_order.current_price from dish_order 
                inner join customer_order on dish_order.order_id=customer_order.order_id where isfinished = 0 and outlet_id = $1`, 
                [data.outlet]);
            const list_of_products = await db.query(`select product_order.product_id, product_order.order_id, product_order.count from product_order 
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
            res.json(merge_data);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({error:'Что-то пошло не так!'});
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

    app.post('/api/add_topping', file_uploader.single('image'), async (req, res) => {
        try {
            const data = req.body;
            const filename = req.body.filename !== undefined ? req.body.filename : req.file.filename;
            await db.query(`insert into topping(name, type, price, image_path, ismeaty, isspicy) values($1, $2, $3, $4, $5, $6)`, 
                [data.name, data.type, data.price, filename, (data.ismeaty=='on'?1:0), (data.isspicy=='on'?1:0)]);
            res.json({result: 'Ингредиент добавлен!'});
        }
        catch (error) {
            res.status(500).json({error:'Что-то пошло не так!'});
        }
    });

    app.post('/api/add_dish', file_uploader.single('image'), async (req, res) => {
        try {
            const data = req.body;
            const filename = req.body.filename !== undefined ? req.body.filename : req.file.filename;
            const inserted_dish = await db.query(`insert into dish(name, price, image_path, dough_type) values($1, $2, $3, $4) returning dish_id`, 
                [data.name, data.price, filename, (data.dough_type=='on'?1:0)]);
            const inserted_dish_id = inserted_dish.rows[0];
            const toppings_array = Object.keys(data);
            await toppings_array.forEach(async (element) => {
                try {
                    if (data[element] == 'on')
                        await db.query(`insert into dish_topping(topping_id, dish_id) values($1, $2)`, 
                            [element, inserted_dish_id.dish_id]);
                }
                catch (error) {
                    res.status(500).json({error:'Что-то пошло не так!'});
                }
            })
            res.json({result: 'Блюдо добавлено!'});
        }
        catch (error) {
            res.status(500).json({error:'Что-то пошло не так!'});
        }
    });

    app.post('/api/add_product', file_uploader.single('image'), async (req, res) => {
        try {
            const data = req.body;
            const filename = req.body.filename !== undefined ? req.body.filename : req.file.filename;
            await db.query(`insert into product(name, price, image_path, description, type) values($1, $2, $3, $4, $5)`, 
                [data.name, data.price, filename, data.description, data.type]);
            res.json({result: "Товар был добавлен!"});
        }
        catch (error) {
            res.status(500).json({error:'Что-то пошло не так!'});
        }
    });

    app.post('/api/add_outlet', async (req, res) => {
        try {
            const data = req.body;
            await db.query(`insert into outlet(town, address, district) values($1, $2, $3)`, 
                [data.town, data.address, data.district]);
            res.json({result: "Заведение было добавлено"});
        }
        catch(error) {
            res.status(500).json({error:'Что-то пошло не так!'});
        }
    });

    app.post('/api/change_interface_data', async (req, res) => {
        try {
            const interface_file_path = __dirname + '/interface-config.json';
            //fs.writeFileSync(interface_file_path, JSON.stringify(req.body));
            res.json({result: "Данные интерфейса были изменены!"});
        }
        catch(error) {
            res.status(500).json({error:'Что-то пошло не так!'});
        }
    });

    app.post('/api/change_business_data', file_uploader.array('image'), async (req, res) => {
        try {
            /*const data = req.body;
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
            fs.writeFileSync(interface_file_path, JSON.stringify(form_data));*/
            res.json({result: "Данные бизнеса были изменены!"});
        }
        catch(error) {
            res.status(500).json({error:'Что-то пошло не так!'});
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
            else {
                const user_data = await db.query(`select * from account where login = $1`, [req.query.login]);
                if (user_data.rows.length == 0) {
                        const cashier_data = await db.query(`select * from cashier_account where login = $1`, [req.query.login]);
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
                        const user_orders_data = await db.query(`select customer_order.*, 
                            jsonb_agg(json_build_object('id', dish_order.dish_id, 'count', dish_order.count, 'size', dish_order.size)) as dishes, 
                            jsonb_agg(json_build_object('id', product_order.product_id, 'count', product_order.count)) as products
                            from customer_order
                            left join product_order on customer_order.order_id = product_order.order_id
                            left join dish_order on customer_order.order_id = dish_order.order_id
                            where customer_order.account_id = $1
                            group by customer_order.order_id`, [user_data.rows[0].account_id]);
                        res.json({ error: false, user_data: user_data.rows[0], orders: user_orders_data.rows});
                    }
                    else {
                        res.json({error: true, result: "Не верный логин"});
                    }
                }
            }
        }
        catch(err) {
            res.status(500).json({error:'Что-то пошло не так!'});
        }
    });

    app.post('/api/register_new_client', file_uploader.single('image'), async (req, res) => {
        try {
            const data = req.body;
            const salt = await bcrypt.genSalt();
            const hashed_password = await bcrypt.hash(data.password, salt);
            const same_user_logins = await db.query(`select * from account where login = $1`, [data.login]);
            const same_cashier_logins = await db.query(`select * from cashier_account where login = $1`, [data.login]);
            if (same_user_logins.rows.length == 0 && same_cashier_logins.rows.length == 0 && data.login != process.env.ADMIN_ACCOUNT) {
                await db.query(`insert into account(name, surname, town, coins, address, login, password) values($1, $2, $3, 0, $4, $5, $6)`, [data.name, data.surname, data.town, data.address, data.login, hashed_password]);
                res.json({result: "Новый клиент зарегистрирован"});
            }
            else {
                res.json({result: "Данный логин уже используется"});
            }
        }
        catch {
            res.status(500).json({error:'Что-то пошло не так!'});
        }
    });

    app.post('/api/reduce_coins_for_account', async (req, res) => {
        try {
            const data = req.body;
            await db.query(`update account set coins=$1 where account_id=$2`, 
                [data.new_coins, data.account_id]);
            res.json({result: "Количество баллов лояльности успешно уменьшено!"});
        }
        catch {
            res.status(500).json({error:'Что-то пошло не так!'});
        }
    });

    app.post('/api/register_new_cashier', file_uploader.single('image'), async (req, res) => {
        try {
            const data = req.body;
            const salt = await bcrypt.genSalt();
            const hashed_password = await bcrypt.hash(data.password, salt);
            const same_user_logins = await db.query(`select * from account where login = $1`, [data.login]);
            const same_cashier_logins = await db.query(`select * from cashier_account where login = $1`, [data.login]);
            if (same_user_logins.rows.length == 0 && same_cashier_logins.rows.length == 0 && data.login != process.env.ADMIN_ACCOUNT) {
                await db.query(`insert into cashier_account(name, surname, outlet_id, login, password) values($1, $2, $3, $4, $5)`, 
                    [data.name, data.surname, data.outlet, data.login, hashed_password]);
                res.json({result: "Новый кассир был зарегистрирован!"});
            }
            else {
                res.json({result: "Данный логин уже используется!"});
            }
        }
        catch {
            res.status(500).json({error:'Что-то пошло не так!'});
        }
    });

    return app;
};