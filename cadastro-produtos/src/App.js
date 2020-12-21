import React            from 'react';
import { HashRouter }   from 'react-router-dom';
import Navbar           from './components/navbar';
import Rotas            from './rotas';

function App() 
{

    return (

        <HashRouter>

        <div className="App">

            <div className="container">

                <Navbar />

                <Rotas />

            </div>

        </div>

        </HashRouter>

    );

}

export default App;
