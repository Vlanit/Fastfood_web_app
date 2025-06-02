import { observer } from 'mobx-react-lite';

import Link from "./Link";
import LinkImage from "./LinkImage";

import { interface_colors, interface_styles } from "../../styles/ColorData";
import { franchise_data_store } from "../../state/FranchiseDataState";

const Footer = observer((props) => {
    return (
        <div style={{...interface_styles.footer, backgroundColor: interface_colors.secondary_background_color}}>
            <img style={interface_styles.footer_img} src={`/api/images/${franchise_data_store.logo}`}/>
            <div>
                <div style={interface_styles.footer_nav}>
                    <div style={interface_styles.footer_nav_items}>
                        <Link contence={"На главную"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                            hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} href='/'/>
                        <Link contence={"О нас"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                            hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} href='/info'/>
                        <Link contence={"Контакты"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                            hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} href='/info'/>
                        <Link contence={"Адреса"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                            hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} href='/info'/>
                    </div>
                    <div style={interface_styles.social_media}>
                        <LinkImage image_name={"VK.svg"} main_style={interface_styles.nav_button} 
                    hover_style={{...interface_styles.nav_button, backgroundColor: interface_colors.a_color_hover}}/>
                        <LinkImage image_name={"Telegram.svg"} main_style={interface_styles.nav_button} 
                    hover_style={{...interface_styles.nav_button, backgroundColor: interface_colors.a_color_hover}}/>
                        <LinkImage image_name={"Zen.svg"} main_style={interface_styles.nav_button} 
                    hover_style={{...interface_styles.nav_button, backgroundColor: interface_colors.a_color_hover}}/>
                    </div>
                </div>
                <h3 style={interface_styles.h3}>Офис: улица Энгельса, 1, Таганрог, Ростовская область</h3>
                <div style={interface_styles.contact_info}>
                    <h3 style={interface_styles.h3}>8 (951) 849-96-77</h3>
                    <h3 style={interface_styles.h3}>vkomov@sfedu.ru</h3>
                </div>
                <div style={interface_styles.credentials}>
                    <p style={interface_styles.p}>©Pizza Paradizo</p>
                    <p style={interface_styles.p}>Политика конфиденциальности</p>
                    <p style={interface_styles.p}>Пользовательское соглашение</p>
                </div>
            </div>
        </div>
    );
});

export default Footer;