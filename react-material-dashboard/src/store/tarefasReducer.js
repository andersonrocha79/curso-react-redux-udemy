import axios from 'axios';

const http = axios.create(
{
    baseURL : "https://minhastarefas-api.herokuapp.com"
});

const ACTIONS =
{
    LISTAR  : 'TAREFAS_LISTAR',
    ADD     : 'TAREFAS_ADD',
    REMOVER : 'TAREFAS_REMOVE'
}

const ESTADO_INICIAL = 
{
    tarefas : []
}

export const tarefaReducer = (state = ESTADO_INICIAL, action) =>
{

    switch(action.type)
    {

        case ACTIONS.LISTAR:
            return {...state, tarefas: action.tarefas}
            break;

        case ACTIONS.ADD:
            return {...state, tarefas: [...state.tarefas, action.tarefa]}
            break;
   
        case ACTIONS.REMOVER:
            const id                = action.id ;
            const tarefasAtualizado = state.tarefas.filter( tarefa => tarefa.id !== id);
            return {...state, tarefas: tarefasAtualizado};
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
            {
                type: ACTIONS.ADD,    
                tarefa: response.data
            })
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
            {
                type: ACTIONS.REMOVER,    
                id: id
            })
        }).catch(err =>
        {
                
        });
    }

}