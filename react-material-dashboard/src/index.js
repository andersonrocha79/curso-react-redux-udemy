import React        from 'react';
import ReactDOM     from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';

import { Provider }         from 'react-redux';
import { createStore }      from 'redux';
import { applyMiddleware }  from 'redux';
import thunk                from 'redux-thunk';
import mainReducer          from './store';

// permite disparar várias actions ao mesmo tempo
const store = applyMiddleware(thunk) (createStore) (mainReducer);

ReactDOM.render(

    <Provider store={store}>
        <App />
    </Provider>

 ,
document.getElementById('root'));

serviceWorker.unregister();
