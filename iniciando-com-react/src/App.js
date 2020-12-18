import React from 'react';

class App extends React.Component
{

    state = 
    {
        nome : ''
    }

    modificarNome = (event) =>
    {

        let nomeInformado = event.target.value;
        this.setState({nome: nomeInformado});

    }

    criaComboBox = () =>
    {

        const opcoes = ["Anderson", "Hiriane", "Philipe", "Nicolle", "Sabrina"];
        
        const comboBoxOpcoes = opcoes.map(opcao => <option>{opcao}</option>); 

        return (
            <select>
                {comboBoxOpcoes}
            </select>
        )
    }

    componentDidMount()
    {
        console.log("executou - componentDidMount");
    }

    render()
    {

        console.log("executou - render");

        const MeuComboBox = () => this.criaComboBox();

        return (

            <div>

                <input className="text-centralizado" type="text" value={this.state.nome} onChange={this.modificarNome} />
                <h1>1-Props: Hello {this.props.nome} sua idade é: {this.props.idade} e sua cidade é: {this.props.cidade}</h1>
                <h1>2-State: Hello {this.state.nome}</h1>
                <h2>Exemplo ComboBox 1</h2>
                { this.criaComboBox() }
                <h2>Exemplo ComboBox 2</h2>
                <MeuComboBox />

            </div>
            
        )
    }

}

export default App;