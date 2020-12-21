
import React            from 'react';
import ProdutoService   from '../../app/produtoService';
import {withRouter}     from 'react-router-dom';
import Card             from '../../components/card';

const estadoInicial = {
                        nome: '',
                        sku: '',
                        descricao: '',
                        preco: 0,
                        fornecedor: '',
                        sucesso: false,
                        erros: [],
                        atualizando : false
                      }

class CadastroProduto extends React.Component
{

    state = estadoInicial;

    constructor()
    {
        super();
        this.service = new ProdutoService();
    }

    onChange = (event) =>    
    {

        const valor     = event.target.value;
        const nomeCampo = event.target.name;

        this.setState({ [nomeCampo]: valor });

    }

    componentDidMount()
    {

        const sku = this.props.match.params.sku;

        if (sku)
        {

            const resultado = this.service.obterProdutos()
                                          .filter( produto => produto.sku === sku);

            if (resultado.length > 0)
            {
                const produtoEncontrado = resultado[0];
                this.setState({...produtoEncontrado, atualizando: true});
            }

        }

    }

    onSubmit = (event) =>
    {

        event.preventDefault();

        // cria um objeto com os dados do estado
        const produto = {
                            nome: this.state.nome,
                            sku: this.state.sku,
                            descricao: this.state.descricao,
                            preco: this.state.preco,
                            fornecedor: this.state.fornecedor
                        }

        try
        {

            this.service.salvar(produto);

            console.log('salvo com sucesso', produto);        
    
            this.limpaCampos();
    
            this.setState({sucesso: true});
    
        }
        catch (ex)
        {
            this.setState({erros:ex.erros});
        }

    }

    limpaCampos = () =>
    {
        this.setState(estadoInicial);
    }

    render()
    {
        return (

            <Card header={this.state.atualizando ? 'Alteração de Produto' : 'Cadastro de Produto'} >
                
                <form id="frmProduto" onSubmit={this.onSubmit}>

                    
                    {
                        this.state.sucesso &&
                        <div class="alert alert-dismissible alert-success">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Perfeito!</strong> Cadastro realizado com Sucesso!
                        </div> 
                    }    

                    {

                        this.state.erros.length > 0 &&

                        this.state.erros.map( msg => 
                        {
                            return (
                            <div class="alert alert-dismissible alert-danger">
                                <button type="button" class="close" data-dismiss="alert">&times;</button>
                                <strong>Falha!</strong> {msg}
                            </div>                                
                            )
                        })
                        
                    }                                                            

                    <div className="row">

                        <div className="col-md-8">

                            <div className="form-group">

                                <label>Nome</label>
                                <input type="text" 
                                    name="nome" 
                                    className="form-control" 
                                    value={this.state.nome} 
                                    onChange={this.onChange} />
                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="form-group">

                                <label>Sku</label>
                                <input type="text" 
                                    name="sku" 
                                    className="form-control" 
                                    value={this.state.sku} 
                                    disabled={this.state.atualizando}
                                    onChange={this.onChange}/>
                            </div>

                        </div>

                    </div>

                    <div className="row">

                        <div className="col-md-12">

                            <div className="form-group">

                                <label>Descrição Completa</label>
                                <textarea className="form-control" 
                                        name="descricao" 
                                        value={this.state.descricao} 
                                        onChange={this.onChange}/>
                            </div>

                        </div>

                    </div>     

                    <div className="row">

                        <div className="col-md-3">

                            <div className="form-group">

                                <label>Preço</label>
                                <input type="text" 
                                    className="form-control" 
                                    name="preco" 
                                    value={this.state.preco} 
                                    onChange={this.onChange} />
                            </div>

                        </div>

                        <div className="col-md-9">

                            <div className="form-group">

                                <label>Fornecedor</label>
                                <input type="text" 
                                    className="form-control" 
                                    name="fornecedor" 
                                    value={this.state.fornecedor} 
                                    onChange={this.onChange} />
                            </div>

                        </div>

                    </div>     

                    <div className="row">

                        <div className="col-md-1">
                            <button type="submit" className="btn btn-success">
                                {this.state.atualizando ? "Atualizar" : "Cadastrar"}
                            </button>
                        </div>

                        <div className="col-md-1">
                            <button className="btn btn-primary"
                                    onClick={this.limpaCampos} >Limpar</button>
                        </div>

                    </div>                                                      

                </form>

            </Card>

        )

    }

}

export default withRouter(CadastroProduto);