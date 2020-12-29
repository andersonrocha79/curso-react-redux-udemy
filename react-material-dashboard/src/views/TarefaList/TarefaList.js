import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { TarefasToolbar, TarefasTable } from './components';

import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';

// importação das funções 'reducer'
import  { 
            listar, 
            salvar, 
            excluir,
            alterarStatus 
        }   from '../../store/tarefasReducer';

import  {
            esconderMensagem
        }   from '../../store/mensagensReducer';

import { Button, Dialog, DialogContent, DialogActions, DialogTitle } from "@material-ui/core";

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

const TarefasList = (props) => 
{

    const classes = useStyles();  

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
                    alterarStatus={props.alterarStatus}
                    deleteAction={props.excluir} >
                </TarefasTable>
            </div>

            <Dialog 
                open={props.openDialog}
                onClose={props.esconderMensagem}>
                <DialogTitle>Atenção</DialogTitle>
                <DialogContent>{props.mensagem}</DialogContent>
                <DialogActions>
                    <Button onClick={props.esconderMensagem}>Fechar</Button>
                </DialogActions>
            </Dialog>

        </div>
        
    );
    
};

const mapStateToProps = state =>
({
    tarefas: state.tarefas.tarefas,
    mensagem: state.mensagens.mensagem,
    openDialog: state.mensagens.mostrarMensagem
});

// mantém os métodos do 'reducer' no 'props' deste componente
const mapDispatchToProps = dispatch => 
bindActionCreators(
{
    listar, 
    salvar, 
    excluir, 
    alterarStatus,
    esconderMensagem
}, 
dispatch);


export default connect(mapStateToProps, mapDispatchToProps) (TarefasList);
