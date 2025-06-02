import { interface_colors, interface_styles, button, button_hover, h2 } from "../../styles/ColorData";
import Button from "./Button";

function ActionCard(props) {

    if (props.big)
        return (
            <div style={{...interface_styles.big_action_card, backgroundColor: interface_colors.card_background_color}}>
                <img style={interface_styles.big_action_card_img} 
                    src={`/api/images/${props.image_path}`}/>
                <div style={{...interface_styles.action_card, ...interface_styles.big_action_card_div}}>
                    <h2 style={{...h2, ...interface_styles.big_action_card_h2}}>{props.name}</h2>
                    <p style={interface_styles.big_action_card_h2}>{props.description}</p>
                    <Button text={"Посмотреть"} main_style={{...button, ...interface_styles.large}}
                        hover_style={{...button_hover, ...interface_styles.large}} onClick={()=>props.button_action()}/>
                </div>
            </div>
        );
    else 
        return (
            <div style={{...interface_styles.action_card, backgroundColor: interface_colors.card_background_color}}>
                <img src={`/api/images/${props.image_path}`}/>
                <h2 style={h2}>{props.name}</h2>
                <p style={interface_styles.p}>{props.description}</p>
                <Button text={"Посмотреть"} main_style={{...button, ...interface_styles.small}}
                    hover_style={{...button_hover, ...interface_styles.small}} onClick={()=>props.button_action()}/>
            </div>
        );
}

export default ActionCard;