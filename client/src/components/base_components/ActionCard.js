import { interface_colors, interface_styles } from "../../styles/ColorData";
import Button from "./Button";

function ActionCard(props) {
    const buttonStyle = {...interface_styles.button, color: interface_colors.button_text_color, backgroundColor: interface_colors.button_color};
    const buttonHoverStyle = {...interface_styles.button, color: interface_colors.button_text_color_hover, backgroundColor: interface_colors.button_color_hover};

    return (
        <div style={{...interface_styles.action_card, backgroundColor: interface_colors.card_background_color}}>
            <img src={`http://localhost:3000/api/images/${props.image_path}`}/>
            <h2 style={{...interface_styles.h2, color: interface_colors.h2_color}}>{props.name}</h2>
            <p style={interface_styles.p}>{props.description}</p>
            <Button text={"Посмотреть"} main_style={{...buttonStyle, ...interface_styles.small}}
                hover_style={{...buttonHoverStyle, ...interface_styles.small}} onClick={()=>props.button_action()}/>
        </div>
    );
}

export default ActionCard;