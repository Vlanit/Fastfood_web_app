import { useState } from "react";

function LinkImage(props) {
    const [isHovering, setHover] = useState(false);

    return (
        <a style={isHovering?{...props.hover_style, cursor: "pointer"}:props.main_style}
            onMouseEnter={() => setHover(true)} onMouseLeave={() => {setHover(false)}} href={props.href} onClick={() => props.onClick()}>
            <img src={`/api/images/${props.image_name}`} style={isHovering?{filter: "invert()", cursor: "pointer", width: "100%"}:{width: "100%"}}/>
        </a>
    )
}

export default LinkImage;