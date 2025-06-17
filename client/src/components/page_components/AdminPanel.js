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
import OutletInsertTab from "../base_components/OutletInsertTab";
import OutletDeleteTab from "../base_components/OutletDeleteTab";
import ActionInsertTab from "../base_components/ActionInsertTab";
import ActionDeleteTab from "../base_components/ActionDeleteTab";
import DishDeleteTab from "../base_components/DishDeleteTab";
import ToppingDeleteTab from "../base_components/ToppingDeleteTab";
import ProductDeleteTab from "../base_components/ProductDeleteTab";
import WorkerDeleteTab from "../base_components/WorkerDeleteTab"

function TabManager(props) {
    switch(props.tab){
        case 1:
            return <BusinessCustomizationTab/>;
        case 1.1:
            return <BusinessCustomizationTab/>;
        case 1.2:
            return <OutletInsertTab/>;
        case 1.3:
            return <OutletDeleteTab/>;
        case 2:
            return <CashierRegisterTab/>;
        case 2.1:
            return <WorkerDeleteTab/>;
        case 3:
            return <ToppingInsertTab/>;
        case 3.1:
            return <ToppingInsertTab/>;
        case 3.2:
            return <DishInsertTab toppings={main_page_store.toppings}/>;
        case 3.3:
            return <ProductInsertTab/>;
        case 3.4:
            return <ActionInsertTab/>;
        case 3.5:
            return <ToppingDeleteTab/>;
        case 3.6:
            return <DishDeleteTab toppings={main_page_store.toppings}/>;
        case 3.7:
            return <ProductDeleteTab/>;
        case 3.8:
            return <ActionDeleteTab/>;
        case 4:
            return <InterfaceCustomizationTab/>;
    }
};

function AdminPanel(props) {
    const [current_tab, setTab] = useState(1);

    return (
        <div style={interface_styles.section}>
            <div style={interface_styles.flex_between_start}>
                <div style={interface_styles.sidebar}>
                    <Link contence={"Бизнес"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                        hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(1)}/>
                        {current_tab >= 1 && current_tab < 2 ? <div style={interface_styles.sidebar}>
                        <Link contence={"О нас"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                            hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(1.1)}/>
                        <Link contence={"Заведения"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                            hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(1.2)}/>
                    </div>:null}
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
                        <Link contence={"Акции"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                            hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(3.4)}/>
                    </div>:null}
                    <Link contence={"Интерфейс"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                        hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(4)}/>
                </div>
                {current_tab >= 1.2 && current_tab <= 1.3 ?
                        <div style={interface_styles.sidebar}>
                            <Link contence={"Добавить"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                                hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(1.2)}/>
                            <Link contence={"Удалить"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                                hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(1.3)}/>
                        </div>
                    :null
                }
                {current_tab == 2 || current_tab == 2.1 ?
                        <div style={interface_styles.sidebar}>
                            <Link contence={"Добавить"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                                hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(2)}/>
                            <Link contence={"Удалить"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                                hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(2.1)}/>
                        </div>
                    :null
                }
                {current_tab == 3.1 || current_tab == 3.5 ?
                        <div style={interface_styles.sidebar}>
                            <Link contence={"Добавить"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                                hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(3.1)}/>
                            <Link contence={"Удалить"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                                hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(3.5)}/>
                        </div>
                    :null
                }
                {current_tab == 3.2 || current_tab == 3.6 ?
                        <div style={interface_styles.sidebar}>
                            <Link contence={"Добавить"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                                hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(3.2)}/>
                            <Link contence={"Удалить"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                                hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(3.6)}/>
                        </div>
                    :null
                }
                {current_tab == 3.3 || current_tab == 3.7 ?
                        <div style={interface_styles.sidebar}>
                            <Link contence={"Добавить"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                                hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(3.3)}/>
                            <Link contence={"Удалить"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                                hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(3.7)}/>
                        </div>
                    :null
                }
                {current_tab == 3.4 || current_tab == 3.8 ?
                        <div style={interface_styles.sidebar}>
                            <Link contence={"Добавить"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                                hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(3.4)}/>
                            <Link contence={"Удалить"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                                hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} onClick={(event) => setTab(3.8)}/>
                        </div>
                    :null
                }
                <div>
                <TabManager tab={current_tab}/>
            </div>
            </div>
        </div>
    );
}

export default AdminPanel;