import { useState } from "react";

function Button(props) {
    const [isHovering, setHover] = useState(false);

    return (
        <button style={isHovering?{...props.hover_style, cursor: "pointer"}:props.main_style} onClick={()=>props.onClick()}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => {setHover(false)}
        }>{props.text}</button>
    )
}

export default Button;