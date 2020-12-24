import React, { useState ,useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { TarefasToolbar, TarefasTable } from './components';

import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';
import { listar, salvar, excluir }  from '../../store/tarefasReducer';

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

const TarefasList = (props) => 
{

    const classes                       = useStyles();
    const [tarefas, setTarefas]         = useState([]);
    const [openDialog, setOpenDialog]   = useState(false);
    const [mensagem, setMensagem]       = useState("");
   

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

    useEffect( () =>
    {

        // busca as tarefas após carregar a página
        // utilizando redux
        props.listar();

    }, []);

    return (

        <div className={classes.root}>
            <TarefasToolbar salvar={props.salvar} />
            <div className={classes.content}>
                <TarefasTable 
                    tarefas={props.tarefas}
                    alterarStatus={alterarStatus}
                    deleteAction={props.excluir} >
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

const mapStateToProps = state =>
({
    tarefas: state.tarefas.tarefas
});

// mantém os métodos do 'reducer' no 'props' deste componente
const mapDispatchToProps = dispatch => bindActionCreators({listar, salvar, excluir}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps) (TarefasList);
