const PRODUTOS = '_PRODUTOS';

export function ErroValidacao(erros)
{
    this.erros = erros;
}

export default class produtoService
{

    obterIndex = (sku) =>    
    {

        // procura o produto pelo sku e retorna o índice

        let index = null;

        this.obterProdutos().forEach((produto, i) => 
        {
            if (produto.sku === sku)    
            {
                index = i;
            }
        });

        return index;
    }

    salvar = (produto) =>
    {

        // valida o registro
        this.validar(produto);

        // busca a lista de produtos do 'localstorage'
        let produtos = localStorage.getItem(PRODUTOS);

        // se tiver vazio, inicializa 
        if (!produtos)
        {
            produtos = [];
        }
        else
        {
            produtos = JSON.parse(produtos);
        }

        const index = this.obterIndex(produto.sku);

        if (index === null)
        {

            // inclui mais um produto no array
            produtos.push(produto);
        }
        else
        {

            // atualiza o produto já cadastrado
            produtos[index] = produto;
        }

        // atualiza o 'localStorage' (transforma um array json em string)
        localStorage.setItem(PRODUTOS, JSON.stringify(produtos));

    }

    validar = (produto) =>
    {

        const erros = [];

        if (!produto.nome || produto.nome.trim() === '')
        {
            erros.push("O nome deve ser informado.");
        }

        if (!produto.sku || produto.sku.trim() === '')
        {
            erros.push("O sku deve ser informado.");
        }        

        if (!produto.preco || produto.preco.trim() === '' || produto.preco <= 0)
        {
            erros.push("O preço deve ser informado.");
        }        

        if (!produto.fornecedor || produto.fornecedor.trim() === '')
        {
            erros.push("O fornecedor deve ser informado.");
        }          

        if (erros.length > 0)
        {
            throw new ErroValidacao(erros);
        }

    }

    obterProdutos = () =>
    {

        const produtos = localStorage.getItem(PRODUTOS);

        if (!produtos)
        {
            return [];
        }
        else
        {
            return JSON.parse(produtos);
        }

    }

    excluir = (sku) =>
    {

        const index = this.obterIndex(sku);

        if (index !== null)
        {

            const produtos = this.obterProdutos();
            produtos.splice(index, 1);
            localStorage.setItem(PRODUTOS, JSON.stringify(produtos));
            return produtos;
            
        }

    }

}