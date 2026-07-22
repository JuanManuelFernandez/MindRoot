import { useState, useEffect } from 'react'
import './App.css'

const categorias = {
  ideas: { nombre: 'Ideas', icono: 'src/assets/Idea.png' },
  tareasDiarias: { nombre: 'Tareas Diarias', icono: 'src/assets/Diaria.png' },
  proyectos: { nombre: 'Proyectos', icono: 'src/assets/Carpeta.png' },
  recordatorios: { nombre: 'Recordatorios', icono: 'src/assets/Campana.png' },
}

function App() {
  const [notas, setNotas] = useState(() => {
    const notasGuardadas = localStorage.getItem('notasMindRoot');
    return notasGuardadas ? JSON.parse(notasGuardadas) : []
  });

  const [categoriaActiva, setCategoriaActiva] = useState("recordatorios");
  const [textoInput, setTextoInput] = useState('')
  const [mostrarVentana, setMostrarVentana] = useState(false);
  const [textoModificar, setTextoModificar] = useState('');
  const [notaEditando, setNotaEditando] = useState(null);

  useEffect(() => {
    localStorage.setItem('notasMindRoot', JSON.stringify(notas))
  }, [notas]);

  const agregarNota = () => {
    if (textoInput.trim() === '') return

    const nuevaNota = {
      id: Date.now(),
      categoria: categoriaActiva,
      contenido: textoInput.trim(),
      fecha: new Date().toLocaleDateString('es-AR'),
    }

    setNotas([...notas, nuevaNota])
    setTextoInput('')
  }

  const modificarNota = () => {
    if(textoModificar.trim() == ''){
      return;
    }
    else{
      setNotas(notas.map(nota => nota.id === notaEditando
        ? {...nota, contenido: textoModificar.trim() } : nota
      ))
    }
    setMostrarVentana(false);
  }

  const eliminarNota = (id) => {
    setNotas(notas.filter(nota => nota.id !== id));
  }

  const notasFiltradas = notas.filter(nota => nota.categoria === categoriaActiva)

  return (
    <>
      <section className={`SeccionMain ${mostrarVentana ? 'Blureado' : ''}`}>
        <div className="MenuLateral">
          <div className="ContenedorTituloMenu">
            <img className="IconoMenu" src="src/assets/IconoMindRoot.png" />
            <span className="TituloMenu">Mind Root</span>
          </div>

          <span className="TituloNotas">Notas</span>

          <ul className="ListaNotas">
            {Object.entries(categorias).map(([clave, {nombre, icono}]) => (
              <li key={clave} className="ItemLista" onClick={() => setCategoriaActiva(clave)}>
                <img src={icono} className='IconoLista'></img>
                {nombre}
              </li>
            ))}
          </ul>
        </div>

        <div className="Central">
          <div className="ContenedorSuperior">
            <input
              className="InputBuscar"
              placeholder={`Nueva nota en ${categorias[categoriaActiva].nombre}...`}
              value={textoInput}
              onChange={(e) => setTextoInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && agregarNota()}
            />
            <button className="BtnAgregar" onClick={agregarNota}>+</button>
          </div>

          <div className="ContenedorNotas">
            {notasFiltradas.length === 0 ? (
              <p className="MensajeVacio">No hay notas en {categorias[categoriaActiva].nombre} todavía</p>
            ) : (
              notasFiltradas.map(nota => (
                <div key={nota.id} className="TarjetaNota">
                  <div className='SuperiorTarjeta'>
                    <p className="ContenidoNota">{nota.contenido}</p>
                    <button className='BtnModificar' onClick={() => {
                        setNotaEditando(nota.id);
                        setTextoModificar(nota.contenido);
                        setMostrarVentana(true);
                      }}>
                      <img src='src/assets/editar.png' className='IconoTarjeta'></img>
                    </button>
                    <button className='BtnEliminar' onClick={() => eliminarNota(nota.id)}><img src='src/assets/basura.png'></img></button>
                  </div>
                  <span className="FechaNota">{nota.fecha}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      {mostrarVentana && (
            <div className='VentanaModificar'>
              <textarea className='InputModificar' value={textoModificar} onChange={(e) => setTextoModificar(e.target.value)}></textarea>
              <div className='ContenedorBtnsVentana'>
                <button onClick={() => setMostrarVentana(false)} className='BtnCerrar'>
                  <img src='src/assets/Close.png'></img>
                </button>
                <button className='BtnModificarVentana' onClick={modificarNota}>
                  <img src='src/assets/Check.png'></img>
                </button>
              </div>
            </div>
          )}
    </>
  )
}

export default App
