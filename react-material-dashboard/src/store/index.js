// redux (utilizado no App.js)
// reducer principal da aplicação
import { combineReducers } from 'redux';

import { tarefaReducer } from './tarefasReducer';

const mainReducer = combineReducers(
{
    
    tarefas : tarefasReducer    

})

export default mainReducer;