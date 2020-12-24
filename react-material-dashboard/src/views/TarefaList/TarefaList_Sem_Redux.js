import React, { useState ,useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { TarefasToolbar, TarefasTable } from './components';

import { Button, Dialog, DialogContent, DialogActions, DialogTitle } from "@material-ui/core";

import axios from 'axios'; 

const useStyles = makeStyles(theme => (
{
    root:
    {
        padding: theme.spacing(3)
    },
    content:
    {
        marginTop: theme.spacing(2)
    }
}));

const API_URL = "https://minhastarefas-api.herokuapp.com/tarefas";

const TarefasList = () => 
{

    const classes                       = useStyles();
    const [tarefas, setTarefas]         = useState([]);
    const [openDialog, setOpenDialog]   = useState(false);
    const [mensagem, setMensagem]       = useState("");
   
    const salvar = (tarefa) =>
    {

        axios.post( API_URL,
                    tarefa,
                    {
                        headers : 
                        {
                            'x-tenant-id' : localStorage.getItem("email_usuario_logado")
                        }
                    }).then(response =>
                    {

                        console.log("sucesso: ", response.data);

                        const novaTarefa = response.data;

                        if (novaTarefa)
                        {
                            setTarefas([...tarefas, novaTarefa]);
                        }
                        
                        setMensagem("Tarefa registrada com Sucesso!");
                        setOpenDialog(true); 
                        
                    }).catch(err =>
                    {
                        console.log("erro: ", err);
                        setMensagem("Falha durante processamento.");
                        setOpenDialog(true); 
                    });
    }

    const listarTarefas = () =>
    {

        axios.get(API_URL,
        {        
            headers : 
            {
                'x-tenant-id' : localStorage.getItem("email_usuario_logado")
            }
        }).then(response =>
        {
            console.log("sucesso ao buscar tarefas: ", response.data);
            const listarTarefas = response.data;
            setTarefas(listarTarefas);
        }).catch(err =>
        {
            console.log("erro ao buscar tarefas: ", err);
            setMensagem("Falha durante selecionar as tarefas no servidor");
            setOpenDialog(true);               
        });
                
    }

    const alterarStatus = (id) =>
    {

        axios.patch( `${API_URL}/${id}`,
                     null,
                     {
                        headers : 
                        {
                            'x-tenant-id' : localStorage.getItem("email_usuario_logado")
                        }
                     }).then(response =>
                     {

                        console.log("sucesso na alteração do status: ", response.status);

                        // procura a tarefa alterada e faz a atualização
                        // para não precisar recarregar a lista
                        const lista = [...tarefas];
                        lista.forEach(tarefa =>
                        {
                            if (tarefa.id === id)  
                            {
                                tarefa.done = true;
                            }
                        });
                        setTarefas(lista);

                        setMensagem("Tarefa finalizada com Sucesso!");
                        setOpenDialog(true);                        
                        
                    }).catch(err =>
                    {
                        console.log("erro: ", err);
                        setMensagem("Falha ao tentar finalizar a tarefa.");
                        setOpenDialog(true);                        
                    });        
    }

    const excluir = (id) => 
    {

        axios.delete(`${API_URL}/${id}`,
                     {
                        headers : 
                        {
                            'x-tenant-id' : localStorage.getItem("email_usuario_logado")
                        }
                     }).then(response =>
                     {

                        console.log("registro excluido com sucesso: ", response.status);

                        // retorna os registros, sem a tarefa deletada
                        const lista = tarefas.filter( tarefa => tarefa.id !== id);
                        setTarefas(lista);    
                        
                        setMensagem("Tarefa excluída com Sucesso!");
                        setOpenDialog(true);                        
                        
                    }).catch(err =>
                    {
                        console.log("erro: ", err);
                        setMensagem("Falha ao tentar excluir a tarefa.");
                        setOpenDialog(true);                        
                    });           
    }

    useEffect( () =>
    {

        // busca as tarefas após carregar a página
        listarTarefas();

    }, []);

    return (

        <div className={classes.root}>
            <TarefasToolbar salvar={salvar} />
            <div className={classes.content}>
                <TarefasTable 
                    tarefas={tarefas}
                    alterarStatus={alterarStatus}
                    deleteAction={excluir} >
                </TarefasTable>
            </div>

            <Dialog 
                open={openDialog}
                onClose={e => setOpenDialog(false)}>
                <DialogTitle>Atenção</DialogTitle>
                <DialogContent>{mensagem}</DialogContent>
                <DialogActions>
                    <Button onClick={e => setOpenDialog(false)}>Fechar</Button>
                </DialogActions>
            </Dialog>

        </div>
        
    );
    
};

export default TarefasList;
