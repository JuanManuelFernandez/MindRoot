import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <section class="SeccionMain">
      <div class="MenuLateral">
        <div class="ContenedorTituloMenu">
          <img class="IconoMenu" src="src/assets/IconoMindRoot.png"></img>
          <span class="TituloMenu">Mind Root</span>
        </div>

        <span class="TituloNotas">Notas</span>

        <ul class="ListaNotas">
          <li>Ideas</li>
          <li>Tareas Diarias</li>
          <li>Projectos</li>
          <li>Recordatorios</li>

        </ul>
      </div>

      <div class="Central">
        <div class="ContenedorSuperior">
          <input class="InputBuscar" placeholder='Buscar nota...'></input>
          <button class="BtnAgregar">+</button>
        </div>
      </div>
    </section>
  )
}

export default App
