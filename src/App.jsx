import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="body">
        <h1 className="title"> <i className="bi bi-book"></i> Mundo das Palavras</h1>
        <form className="col-md-3" action="">
          <div className="form-group">

            <input type="text" className="form-control" id="pesquisaGeral" placeholder="Pesquisar" />
          </div>
        </form>
        <i className="bi bi-person-circle perfilicone"></i>
        
      </div>

    </>
  )
}

export default App
