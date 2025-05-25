const http = require('http');
const socket_io = require('socket.io');
const client_pool = require('./database/pool.js');
const app = require('./api-server.js')(client_pool);
require('dotenv').config();

const server = http.createServer(app);
const port = process.env.APP_PORT;

server.listen(port, () => {
    console.log(`Server is now running on port ${port}`);
});

const socket_server = socket_io(server, {cors:{origin:'*',}});
//socket_server.engine.use(session_app);

socket_server.on('connection', (socket) => {
    console.log(`${socket.id} is connected`);

    socket.on('disconnect', (socket) => {
        console.log(`${socket.id} has disconnected`);
    });

    socket.on('join_room', (room) => {
        socket.join(`outlet-${room}`);
        console.log(`Socket ${socket} joined room outlet-${room}`);
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
        console.log(socket_server, order_with_client);
        socket_server.to(`outlet-${order_data.outlet_id}`).emit('new_order', order_with_client);
    });

    socket.on('order_status_changed', async (order_status) => {
        await client_pool.query(`update customer_order
            set isstarted=$1, iscooked=$2, isfinished=$3 where order_id=$4;`,
            [order_status.isstarted ? 1 : 0, 
            order_status.iscooked ? 1 : 0, 
            order_status.isfinished ? 1 : 0, 
            order_status.order_id]);

        socket_server.in(order_status.client).emit('new_order_state', order_status);
    })
});