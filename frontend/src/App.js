
import { BrowserRouter } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import { Provider } from "react-redux"
import { store } from "./createStore"
import RouteList from './RouteList';
import { ToastContainer } from 'react-toastify';

function App() {
    
    return (
        <Provider store={store}>
            <ToastContainer autoClose={2500} />
            <Suspense fallback={null}>
                <BrowserRouter>
                        <RouteList />
                </BrowserRouter>
            </Suspense>
        </Provider>
    );
}

export default App;
