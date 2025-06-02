import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { main_page_store } from './state/MainPageDataState';
import { franchise_data_store } from './state/FranchiseDataState';

main_page_store.renewAllData();
franchise_data_store.renewAllData();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
  </StrictMode>
);
