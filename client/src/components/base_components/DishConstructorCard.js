import { useNavigate } from 'react-router-dom';
import { interface_styles, interface_colors } from "../../styles/ColorData";

import Button from '../base_components/Button.js';

function PizzaConstructorCard(props) {
    const buttonStyle = {...interface_styles.button, color: interface_colors.button_text_color, backgroundColor: interface_colors.button_color};
    const buttonHoverStyle = {...interface_styles.button, color: interface_colors.button_text_color_hover, backgroundColor: interface_colors.button_color_hover};

    let navigate = useNavigate(); 

    return (
        <div style={{...interface_styles.dish_constructor_card, 
            backgroundImage: `url(/api/images/${props.image_path})`}}>
            <p style={interface_styles.p}>Не смогли найти пиццу по вкусу?</p>
            <p style={interface_styles.p}>Не беда! Попробуйте создать её сами!</p>
            <Button text={"Попробовать!"} main_style={{...buttonStyle, ...interface_styles.large}}
                hover_style={{...buttonHoverStyle, ...interface_styles.large}} onClick={()=>navigate('/constructor')}/>
        </div>
    );
}

export default PizzaConstructorCard;