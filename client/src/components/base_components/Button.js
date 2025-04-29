import { useState } from "react";

function Button(props) {
    const [isHovering, setHover] = useState(false);

    if (props.onClick) {
        return (
            <button style={isHovering?{...props.hover_style, cursor: "pointer"}:props.main_style} onClick={()=>props.onClick()}
            onMouseEnter={() => setHover(true)} onMouseLeave={() => {setHover(false)}
            } type="submit">{props.text}</button>
        )
    }
    else {
        return (
            <button style={isHovering?{...props.hover_style, cursor: "pointer"}:props.main_style}
            onMouseEnter={() => setHover(true)} onMouseLeave={() => {setHover(false)}
            } type="submit">{props.text}</button>
        )
    }
}

export default Button;