
import { observer } from 'mobx-react-lite';

import Link from "./Link";
import { interface_colors, interface_styles } from "../../styles/ColorData";
import { franchise_data_store } from "../../state/FranchiseDataState";

const Header = observer((props) => {
    return (
        <div style={interface_styles.header}>
            <div style={interface_styles.header_nav_items}>
                <Link contence={"О нас"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                    hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} href="/info"/>
                <Link contence={"Контакты"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                    hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} href="/info"/>
            </div>
            <div style={interface_styles.logo}>
                <img style={interface_styles.logo_img} src={`/api/images/${franchise_data_store.logo}`}/>
                <p>Pizza Paradizo</p>
            </div>
            <p style={interface_styles.header_opening_time}>Ежедневно с 09:00 до 22:00</p>
        </div>
    );
});

export default Header;