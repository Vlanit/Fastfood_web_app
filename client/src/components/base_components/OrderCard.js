import { interface_colors, interface_styles, h3, p, button, button_hover } from '../../styles/ColorData';
import Button from './Button';

function OrderCard(props) {
    return (
        <div style={{...interface_styles.order_card, backgroundColor: interface_colors.card_background_color}}>
        <div>
            <h3 style={h3}>Заказ №{props.id} (
                {new Date(Date.parse(props.datetime)).toLocaleString("en-GB", { timeZone: "UTC" }).replaceAll('/', '.')}
            )</h3>
            <div style={interface_styles.flex_between}>
                <p style={{...p, ...interface_styles.description}}>{props.address}</p>
                <Button text={props.button_name} main_style={button}
                    hover_style={button_hover} onClick={() => props.button_action()}/>
            </div>
        </div>

    </div>
    )
};

export default OrderCard;