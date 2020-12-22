import React, { useState } from 'react';

// componente funcional

// https://pt-br.reactjs.org/

function UseState() 
{

    // hooks
    // ciclo de vida (useEffect)

    const [ numero       , setNumero ]       = useState();
    const [ segundoNumero, setSegundoNumero] = useState();
    const [ resultado    , setResultado]     = useState();    

    const somar = () =>
    {

        const numeroInt        = parseInt(numero);
        const segundoNumeroInt = parseInt(segundoNumero);

        setResultado(numeroInt + segundoNumeroInt);;

    }


    return (

    <div>
        
        Número 1: <br/>
        <input type="text" 
               value={numero} 
               onChange={e => setNumero(e.target.value)} /> <br/>

        Número 2: <br/>
        <input type="text" 
               value={segundoNumero} 
               onChange={e => setSegundoNumero(e.target.value)} /> <br/>

        <br/>
        <button onClick={somar} >Somar</button>
        <br/>
        <br/>

        Resultado: <br/>
        <input type="text" value={resultado} /> <br/>

    </div>

  );

}

export default UseState;
