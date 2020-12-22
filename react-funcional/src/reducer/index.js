import React, { useState } from 'react';
import useStore            from './somaReducer';

// componente funcional

// https://pt-br.reactjs.org/
// http://facebook.github.io/flux/

function ReducerHook() 
{

    // hooks
    // ciclo de vida (useEffect)

    const [ numero       , setNumero ]       = useState('');
    const [ segundoNumero, setSegundoNumero] = useState('');
    const [ store        , dispatch]         = useStore();

    const somar = () =>
    {

        const numeroInt        = parseInt(numero);
        const segundoNumeroInt = parseInt(segundoNumero);

        dispatch({ type: 'SOMA', payload: numeroInt + segundoNumeroInt});

    }

    const subtrair = () =>
    {

        const numeroInt        = parseInt(numero);
        const segundoNumeroInt = parseInt(segundoNumero);

        dispatch({ type: 'SUBTRAIR', payload: numeroInt - segundoNumeroInt});

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

        <br/>
        <button onClick={subtrair} >Subtrair</button>
        <br/>
        <br/>

        Resultado: <br/>
        <input type="text" value={store.resultado} readOnly /> <br/>

    </div>

  );

}

export default ReducerHook;
