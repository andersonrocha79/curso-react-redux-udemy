import React    from 'react';
import ReactDOM from 'react-dom';
import App      from './App';

import './index.css';

ReactDOM.render(
    <App 
        nome="Anderson Rocha"
        idade={41}
        cidade="Pedro Leopoldo"
    />,
    document.getElementById('root')
);


