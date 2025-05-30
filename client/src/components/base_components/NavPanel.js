import { observer } from 'mobx-react-lite';

import Link from "./Link";
import LinkImage from "./LinkImage";
import { interface_colors, interface_styles, p } from "../../styles/ColorData";
import { user_data_store } from "../../state/UserDataState";

const NavPanel = observer((props) => {
    console.log(user_data_store.orders);
    return (
        <div style={{...interface_styles.nav_panel, backgroundColor: interface_colors.secondary_background_color}}>
            <div style={interface_styles.header_nav_items}>
                <Link contence={"Меню"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                    hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} href={"/menu"}/>
                <Link contence={"Конструктор пиццы"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                    hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} href={"/constructor"}/>
                <Link contence={"Акции"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                    hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} href={"/actions"}/>
                {user_data_store.cashier ? 
                    <Link contence={"Панель заказов"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                        hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} href={"/cashier"}/>
                :null}
                {user_data_store.admin ? 
                    <Link contence={"Панель администратора"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                        hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} href={"/admin"}/>
                :null}
            </div>
            <div style={interface_styles.clients_options}>
                <LinkImage image_name={"ShoppingCart.svg"} main_style={interface_styles.nav_button} 
                    hover_style={{...interface_styles.nav_button, backgroundColor: interface_colors.a_color_hover}}
                    onClick={() => {props.darken(true); props.shopping(true)}}/>
                { user_data_store.authorised ? 
                    <LinkImage image_name={"Account.svg"} main_style={interface_styles.nav_button} 
                        hover_style={{...interface_styles.nav_button, backgroundColor: interface_colors.a_color_hover}}
                        onClick={() => {props.darken(true); props.history(true)}}/>:
                    null
                }
                { user_data_store.authorised ? 
                        <div>
                            <p style={p}>{user_data_store._name} {user_data_store._surname}</p>
                            <p style={p}>{user_data_store.coins} бонусов</p>
                        </div>:
                    <LinkImage image_name={"Account.svg"} main_style={interface_styles.nav_button} 
                        hover_style={{...interface_styles.nav_button, backgroundColor: interface_colors.a_color_hover}}
                        onClick={() => {props.darken(true); props.login(true)}}/>
                }
                { user_data_store.authorised ? 
                    <Link contence={"Выйти"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                        hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}}
                        onClick={() => user_data_store.clear()}/>:
                    null
                }
            </div>
        </div>
    );
});

export default NavPanel;