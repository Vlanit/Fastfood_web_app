import { interface_colors, interface_styles, h3, p, button, button_hover } from '../../styles/ColorData';
import Button from './Button';

function CashierOrderCard(props) {
    return (
        <div style={{...interface_styles.flex_between, ...interface_styles.order_card, backgroundColor: interface_colors.card_background_color}}>
        <div>
            <div style={interface_styles.flex_between}>
                <h3 style={interface_styles.h3}>Заказ №{props.id}</h3>
                <p style={interface_styles.p}>{`(${props.surname} ${props.name})`}</p>
            </div>
            <p style={{...p, ...interface_styles.description}}>{props.address}</p>
            <h3 style={interface_styles.h3}>{
                new Date(Date.parse(props.datetime)).toLocaleString("en-GB", { timeZone: "UTC" }).replaceAll('/', '.')
            }</h3>
        </div>
        <div style={interface_styles.flex_between}>
            <Button text={props.first_button_name} main_style={{...button, ...interface_styles.large}}
                hover_style={{...button_hover, ...interface_styles.large}} onClick={() => props.first_action()}/>
            <Button text={props.second_button_name} main_style={{...button, ...interface_styles.large}}
                hover_style={{...button_hover, ...interface_styles.large}} onClick={() => props.second_action()}/>
        </div>
    </div>
    )
};

export default CashierOrderCard;