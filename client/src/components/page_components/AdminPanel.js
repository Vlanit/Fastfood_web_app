import { useState } from "react";
import { interface_styles, interface_colors } from "../../styles/ColorData";
import { main_page_store } from "../../state/MainPageDataState";

import Link from "../base_components/Link";
import ToppingInsertTab from "../base_components/ToppingInsertTab";
import DishInsertTab from "../base_components/DishInsertTab";
import ProductInsertTab from "../base_components/ProductInsertTab";
import InterfaceCustomizationTab from "../base_components/InterfaceCustomizationTab";
import BusinessCustomizationTab from "../base_components/BusinessCustomizationTab";
import CashierRegisterTab from "../base_components/CashierRegisterTab";

function TabManager(props) {
    switch(props.tab){
        case 1:
            return <BusinessCustomizationTab/>;
        case 2:
            return <CashierRegisterTab/>;
        case 3:
            return <ToppingInsertTab/>;
        case 3.1:
            return <ToppingInsertTab/>;
        case 3.2:
            return <DishInsertTab toppings={main_page_store.toppings}/>;
        case 3.3:
            return <ProductInsertTab/>;
        case 4:
            return <InterfaceCustomizationTab/>;
    }
};

function AdminPanel(prosp) {
    const [current_tab, setTab] = useState(1);
    return (
        <div style={interface_styles.section}>
            <div style={interface_styles.flex_between_start}>
                <div style={interface_styles.sidebar}>
                    <Link contence={"Бизнес"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                        hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(1)}/>
                    <Link contence={"Работники"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                        hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(2)}/>
                    <Link contence={"Меню"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                        hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(3)}/>
                    {current_tab >= 3 && current_tab < 4 ? <div style={interface_styles.sidebar}>
                        <Link contence={"Ингредиенты"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                            hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(3.1)}/>
                        <Link contence={"Блюда"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                            hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(3.2)}/>
                        <Link contence={"Продукция"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                            hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(3.3)}/>
                    </div>:null}
                    <Link contence={"Интерфейс"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                        hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(4)}/>
                </div>
                <div>
                <TabManager tab={current_tab}/>
            </div>
            </div>
        </div>
    );
}

export default AdminPanel;