import { observer } from 'mobx-react-lite';

import Link from "./Link";
import LinkImage from "./LinkImage";
import { interface_colors, interface_styles } from "../../styles/ColorData";
import { user_data_store } from "../../state/UserDataState";

const NavPanel = observer((props) => {
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
                <LinkImage image_name={"Account.svg"} main_style={interface_styles.nav_button} 
                    hover_style={{...interface_styles.nav_button, backgroundColor: interface_colors.a_color_hover}}
                    onClick={() => {props.darken(true); props.login(true)}}/>
            </div>
        </div>
    );
});

export default NavPanel;