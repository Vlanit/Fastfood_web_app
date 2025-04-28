import { useState } from "react";

export function Link(props) {
    const [isHovering, setHover] = useState(false);

    if (props.onClick) {
        return (
            <a style={isHovering?{...props.hover_style, cursor: "pointer"}:props.main_style}
            onMouseEnter={() => setHover(true)} onMouseLeave={() => {setHover(false)}} href={props.href}
            onClick={() => props.onClick()}>{props.contence}</a>
        )
    }
    else {
        return (
            <a style={isHovering?{...props.hover_style, cursor: "pointer"}:props.main_style}
            onMouseEnter={() => setHover(true)} onMouseLeave={() => {setHover(false)}} href={props.href}>{props.contence}</a>
        )
    }
}

export default Link;