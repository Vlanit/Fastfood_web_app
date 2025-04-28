import instance from "../api/server_api";

const all_interface_data = await instance.get('get_interface_data');
const interface_colors = all_interface_data.data.colors;
const interface_styles = all_interface_data.data.styles;

const select = {...interface_styles.select, borderColor: interface_colors.select_border_color};
const input = {...interface_styles.input, borderColor: interface_colors.input_border_color};
const p = {...interface_styles.p, color: interface_colors.text_color};
const h1 = {...interface_styles.h1, color: interface_colors.h1_color};
const h2 = {...interface_styles.h2, color: interface_colors.h2_color};
const h3 = {...interface_styles.h3, color: interface_colors.h3_color};
const button = {...interface_styles.button, color: interface_colors.button_text_color, backgroundColor: interface_colors.button_color};
const button_hover = {...interface_styles.button, color: interface_colors.button_text_color_hover, backgroundColor: interface_colors.button_color_hover};
const a = {...interface_styles.a, color: interface_colors.a_color};
const a_hover = {...interface_styles.a, color: interface_colors.a_color_hover};

export {interface_colors, interface_styles, select, input, p, h1, h2, h3, button, button_hover, a, a_hover};