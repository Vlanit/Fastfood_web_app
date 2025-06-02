import { franchise_data_store } from "../../state/FranchiseDataState";
import { observer } from 'mobx-react-lite';
import { useState } from "react";

import { interface_colors, interface_styles, h1, h2, p } from '../../styles/ColorData.js';

const InfoPage = observer((props) => {

    return (
        <div style={interface_styles.section}>
            <h1 style={h1}>О нас</h1>
            <div style={{...interface_styles.info_card, backgroundColor: interface_colors.card_background_color}}>
                <img src={`/api/images/${franchise_data_store.about_us?.image}`}/>
                <div style={interface_styles.info_card_text}>
                    <h2 style={h2}>{franchise_data_store.about_us.title}</h2>
                    <p style={p}>{franchise_data_store.about_us.text}</p>
                </div>
            </div>
            <div style={{...interface_styles.info_card, backgroundColor: interface_colors.card_background_color}}>
                <div style={interface_styles.info_card_text}>
                    <h2 style={h2}>{franchise_data_store.about_production.title}</h2>
                    <p style={p}>{franchise_data_store.about_production.text}</p>
                </div>
                <img src={`/api/images/${franchise_data_store.about_production?.image}`}/>
            </div>
            <h1 style={h1}>Заведение "в цифрах"</h1>
            <div style={{...interface_styles.info_card, backgroundColor: interface_colors.card_background_color}}>
                <img src={`/api/images/${franchise_data_store.fact_info?.image}`}/>
                <div style={interface_styles.info_card_table}>
                    {franchise_data_store.fact_info?.array?.map((item) => (
                        <div>
                            <h2 style={h2}>{item.number}</h2>
                            <p style={p}>{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            <h1 style={h1}>Наши контакты</h1>
            <div style={{...interface_styles.info_card, backgroundColor: interface_colors.card_background_color}}>
                <div style={interface_styles.contact_card_table}>
                    <p style={{...p, ...interface_styles.bold}}>Контактное лицо: </p>
                    <p style={{...p, ...interface_styles.bold}}>{franchise_data_store.contact_info?.person}</p>
                    <p style={{...p, ...interface_styles.bold}}>Контактный телефон: </p>
                    <p style={{...p, ...interface_styles.bold}}>{franchise_data_store.contact_info?.phone}</p>
                    <p style={{...p, ...interface_styles.bold}}>Электронная почта: </p>
                    <p style={{...p, ...interface_styles.bold}}>{franchise_data_store.contact_info?.email}</p>
                </div>
                <img src={`/api/images/${franchise_data_store.contact_info?.image}`}/>
            </div>
            <h1 style={h1}>Наши заведения</h1>
            <div style={{...interface_styles.dish_card_list, ...interface_styles.card_grid_three}}>
                {franchise_data_store.outlets?.map((item) => (
                    <div style={{...interface_styles.dish_card, backgroundColor: interface_colors.card_background_color}}>
                        <p style={{...p, ...interface_styles.bold}}>{`${item.town} (${item.district})`}</p>
                        <div style={interface_styles.outlet_address}>
                            <img src={`/api/images/AddressIcon.svg`}/>
                            <p style={{...p, ...interface_styles.bold}}>{item.address}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
});

export default InfoPage;