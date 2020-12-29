import axios from 'axios';
import { mostrarMensagem } from './mensagensReducer';

const http = axios.create(
{
    baseURL : process.env.REACT_APP_API_BASE_URL
});

const ACTIONS =
{
    LISTAR        : 'TAREFAS_LISTAR',
    ADD           : 'TAREFAS_ADD',
    REMOVER       : 'TAREFAS_REMOVE',
    UPDATE_STATUS : 'TAREFAS_UPDATE_STATUS'
}

const ESTADO_INICIAL = 
{
    tarefas : [],
    quantidade: 0
}

export const tarefaReducer = (state = ESTADO_INICIAL, action) =>
{

    switch(action.type)
    {

        case ACTIONS.LISTAR:
            return  {
                        ...state, 
                        tarefas: action.tarefas, 
                        quantidade: action.tarefas.length
                    }
            break;

        case ACTIONS.ADD:
            const lista = [...state.tarefas, action.tarefa];
            return  {
                        ...state, 
                        tarefas: lista,
                        quantidade : lista.length 
                    }
            break;
   
        case ACTIONS.REMOVER:
            const id                = action.id ;
            const tarefasAtualizado = state.tarefas.filter( tarefa => tarefa.id !== id);
            return  {
                        ...state, 
                        tarefas: tarefasAtualizado,
                        quantidade: tarefasAtualizado.length
                    };
            break;

        case ACTIONS.UPDATE_STATUS:

            const listaStatusAlterado = [...state.tarefas];
            listaStatusAlterado.forEach(tarefa =>
            {
                if (tarefa.id === action.id)  
                {
                    tarefa.done = true;
                }
            });
            return {...state, tarefas: listaStatusAlterado};

            break;

        default:
            return state;
           
    }

}

export function listar()
{

    return dispatch => 
    {
        http.get('/tarefas',
        {        
            headers : 
            {
                'x-tenant-id' : localStorage.getItem("email_usuario_logado")
            }
        }).then(response =>
        {
            dispatch(
            {
                type: ACTIONS.LISTAR,    
                tarefas: response.data
            })
        }).catch(err =>
        {
                
        });
    }

};

export function salvar(tarefa)
{

    return dispatch => 
    {
        http.post('/tarefas', tarefa,
        {        
            headers : 
            {
                'x-tenant-id' : localStorage.getItem("email_usuario_logado")
            }
        }).then(response =>
        {

            dispatch(
            [
                {
                    type: ACTIONS.ADD,    
                    tarefa: response.data
                }, 
                mostrarMensagem("Tarefa salva com sucesso.")
            ]);

        }).catch(err =>
        {
                
        });
    }

}

export function excluir(id)
{

    return dispatch => 
    {
        http.delete(`/tarefas/${id}`,
        {        
            headers : 
            {
                'x-tenant-id' : localStorage.getItem("email_usuario_logado")
            }
        }).then(response =>
        {
            dispatch(
            [
                {
                    type: ACTIONS.REMOVER,    
                    id: id
                }, 
                mostrarMensagem("Tarefas excluída com sucesso.")
            ]);            
        }).catch(err =>
        {
                
        });
    }

}

export function alterarStatus(id)
{
    return dispatch =>
    {

        http.patch( `tarefas/${id}`,
        null,
        {
           headers : 
           {
               'x-tenant-id' : localStorage.getItem("email_usuario_logado")
           }
        }).then(response =>
        {

            dispatch(
            [
                {
                    type: ACTIONS.UPDATE_STATUS,    
                    id: id
                },
                mostrarMensagem("Status alterado com Sucesso.")
            ]);
           
       }).catch(err =>
       {

       });                
    }
}