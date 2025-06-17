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
                    hover_style={{...interface_styles.nav_button, backgroundColor: interface_colors.a_color_hover}}
                    onClick={() => {}}
                    href='https://vk.com/pizzasicilia?utm_source=yd&utm_medium=cpc&utm_content=astat%3A54858469388%7Cret%3A54858469388%7Ckor%3A0%7Cdsa%3A54858469388%7Ccid%3A700218426%7Cgid%3A5584919105%7Caid%3A17033958527%7Cpt%3Apremium%7Cpos%3A1%7Cst%3Asearch%7Csrc%3Anone%7Cdvc%3Adesktop%7Creg%3A971%7Cadp%3Ano%7Capt%3Anone%7Clink%3Amain&utm_term=%D0%BF%D0%B8%D1%86%D1%86%D0%B5%D1%80%D0%B8%D1%8F&utm_campaign=ps-n_yd_taganrog_s_dostavka'/>
                        <LinkImage image_name={"Telegram.svg"} main_style={interface_styles.nav_button} 
                    hover_style={{...interface_styles.nav_button, backgroundColor: interface_colors.a_color_hover}}
                    onClick={() => {}}
                    href='https://t.me/siciliapizza?utm_source=yd&utm_medium=cpc&utm_content=astat:54858469388|ret:54858469388|kor:0|dsa:54858469388|cid:700218426|gid:5584919105|aid:17033958527|pt:premium|pos:1|st:search|src:none|dvc:desktop|reg:971|adp:no|apt:none|link:main&utm_term=%D0%BF%D0%B8%D1%86%D1%86%D0%B5%D1%80%D0%B8%D1%8F&utm_campaign=ps-n_yd_taganrog_s_dostavka'/>
                        <LinkImage image_name={"Zen.svg"} main_style={interface_styles.nav_button} 
                    hover_style={{...interface_styles.nav_button, backgroundColor: interface_colors.a_color_hover}}
                    onClick={() => {}}
                    href='https://dzen.ru/?ysclid=mbermb4a46881042829'/>
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