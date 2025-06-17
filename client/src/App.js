import {useState, useEffect, Component} from 'react';
import { observer } from 'mobx-react-lite';

import Header from './components/base_components/Header.js';
import NavPanel from './components/base_components/NavPanel.js';
import Footer from './components/base_components/Footer.js';
import DishProductWindow from './components/base_components/DishProductWindow.js';
import LoginTab from './components/base_components/LoginTab.js';
import ClientRegistrationTab from './components/base_components/ClientRegistrationTab.js';
import ShoppingCart from './components/base_components/ShoppingCart.js';
import OrderHistory from './components/base_components/OrderHistory.js';

import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './components/page_components/MainPage.js';
import MenuPage from './components/page_components/MenuPage.js';
import ActionPage from './components/page_components/ActionPage.js';
import CashierPage from './components/page_components/CashierPage.js';
import ConstructorPage from './components/page_components/ConstructorPage.js';
import PaymentSuccess from './components/base_components/PaymentSuccess.js';

import { interface_styles, interface_colors } from './styles/ColorData.js';
import AdminPanel from './components/page_components/AdminPanel.js';
import InfoPage from './components/page_components/InfoPage.js';
import { shopping_cart_store } from './state/ShoppingCartState.js';
import { user_data_store } from './state/UserDataState.js';
import { main_page_store } from './state/MainPageDataState';

const App = observer((props) => {
  const [is_page_darkened, setDark] = useState(false);
  const [is_info_card_open, setInfoCard] = useState(false);
  const [info_card_data, setInfo] = useState({id: -1, name: '', image_path: '', description: '', price: 0, dish: false, product: false});
  const [toppings_array, setToppings] = useState([]);
  const [is_shopping_cart_open, setShoppingCart] = useState(false);
  const [is_order_history_open, setOrderHistory] = useState(false);
  const [is_login_open, setLogin] = useState(false);
  const [is_register_open, setRegister] = useState(false);

  document.body.style.margin = 0;

  useEffect(() => {
    shopping_cart_store.getDataFromSessionStorage();
    user_data_store.getDataFromSessionStorage();

    window.addEventListener("beforeunload",()=>{
      shopping_cart_store.setDataToSessionStorage();
      user_data_store.setDataToSessionStorage();
    });
  }, []);

  const getDishToppingsByID = (id) => {
    console.log(main_page_store.dishes[id].toppings);
    setToppings(main_page_store.dishes[id].toppings);
  }

  return (
    <div style={{...interface_styles.body, backgroundColor: interface_colors.background_color, color: interface_colors.text_color, width: "1528px"}}>
      <div style={is_page_darkened?interface_styles.darkened:null}>
        <Header></Header>
        <NavPanel shopping={setShoppingCart} history={setOrderHistory} login={setLogin} darken={setDark}></NavPanel>
        <Routes>
          <Route path='/' element={<MainPage info={setInfoCard} darken={setDark} card_action={setInfo}/>}></Route>
          <Route path='/actions' element={<ActionPage info={setInfoCard} darken={setDark} card_action={setInfo}/>}></Route>
          <Route path='/menu' element={<MenuPage info={setInfoCard} darken={setDark} card_action={setInfo}/>}></Route>
          <Route path='/constructor' element={<ConstructorPage toppings={toppings_array}/>}></Route>
          <Route path='/success' element={<PaymentSuccess/>}></Route>
          <Route path='/error' element={<Navigate replace to="/"/>}></Route>
          {user_data_store.cashier ? 
            <Route path='/cashier' element={<CashierPage/>}></Route> 
          :null}
          {user_data_store.admin ? 
            <Route path='/admin' element={<AdminPanel/>}></Route>
          :null}
          <Route path='/info' element={<InfoPage/>}></Route>
        </Routes>
        <Footer></Footer>
      </div>
      {is_info_card_open?
        <DishProductWindow id={info_card_data.id} name={info_card_data.name} 
          image_path={info_card_data.image_path} description={info_card_data.description} price={info_card_data.price}
          dish={info_card_data.dish} product={info_card_data.product}
          real_id={info_card_data.dish ? main_page_store.dishes[info_card_data.id].dish_id : main_page_store.products[info_card_data.id].product_id}
          get_toppings_action={getDishToppingsByID}
          navigate={'/constructor'}
          exit_action={() => {setInfoCard(false); setDark(false);}}/>
        :null}
      {is_shopping_cart_open?
        <ShoppingCart exit_action={() => {setShoppingCart(false); setDark(false);}}/>
        :null}
      {is_login_open?
        <LoginTab register_action={() => {setRegister(true); setLogin(false)}} exit_action={() => {setLogin(false); setDark(false)}}/>
        :null}
      {is_register_open?
        <ClientRegistrationTab exit_action={() => {setRegister(false); setDark(false)}}/>
        :null}
      {is_order_history_open?
        <OrderHistory exit_action={() => {setOrderHistory(false); setDark(false)}}/>
        :null
      }
    </div>
  );
});

export default App;