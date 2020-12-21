import React            from 'react';
import ProdutoService   from '../../app/produtoService';
import Card             from '../../components/card';
import ProdutosTable    from './produtosTable';
import { withRouter }   from 'react-router-dom';

class ConsultaProdutos extends React.Component
{

    state = 
    {
        produtos : []
    }

    constructor()
    {
        super();
        this.service = new ProdutoService();
    }

    componentDidMount()
    {
        const produtos = this.service.obterProdutos();
        this.setState({produtos: produtos});
    }

    preparaEdicao = (sku) =>
    {

        // utiliza o 'history' do 'withRouter' para chamar o cadastro de produtos passando o parametro 'sku'
        this.props.history.push(`/cadastro-produtos/${sku}`)
    }

    excluir = (sku) =>
    {

        const produtos = this.service.excluir(sku);
        this.setState({produtos});
    }

    render()
    {
        return (

            <Card header="Consulta Produtos">
                
                <ProdutosTable 
                    produtos      = {this.state.produtos}
                    editarAction  = {this.preparaEdicao} 
                    excluirAction = {this.excluir}>
                </ProdutosTable>
                
            </Card>
        )
    }
}

export default withRouter(ConsultaProdutos);