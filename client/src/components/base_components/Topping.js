import {useState, useEffect} from 'react';
import { interface_styles, interface_colors, p } from '../../styles/ColorData';
import Link from './Link';

function Topping(props) {
    const [added, setAdded] = useState(props.added);

    return (
        <div style={{textAlign: "center", display: "flex", flexDirection: "column", width: "96px", alignItems: "center"}}>
            <img src={`http://localhost:3000/api/images/${props.image_path}`}></img>
            <p style={p}>{props.name}</p>
            <div style={{...interface_styles.change_num, ...interface_styles.flex_between, 
                backgroundColor: interface_colors.secondary_background_color,
                gap: "10px"}}>
                <p style={{...p, ...interface_styles.bold, color: interface_colors.secondary_text_color}}>{props.price} ₽</p>
                {added?
                    <Link contence={"-"} main_style={{...p, ...interface_styles.bold, color: interface_colors.secondary_text_color}} 
                        hover_style={{...p, ...interface_styles.bold, color: interface_colors.a_color_hover}}
                        onClick={() => {props.minusAction(); setAdded(false)}}/>:
                    <Link contence={"+"} main_style={{...p, ...interface_styles.bold, color: interface_colors.secondary_text_color}} 
                        hover_style={{...p, ...interface_styles.bold, color: interface_colors.a_color_hover}}
                        onClick={() => {props.plusAction(); setAdded(true)}}/>}
            </div>
        </div>
    );
}

export default Topping;