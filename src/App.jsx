import { useEffect, useState } from 'react'

const FollowMouse = () =>{
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({x:0, y:0})

  useEffect (()=> {
    const handleMove =(event) =>{
      const{clientX, clientY} = event
      console.log('handleMove', {clientX, clientY})
      setPosition({x:clientX, y:clientY})
    }
    if(enabled)
    {
      window.addEventListener('pointermove', handleMove)
    }
    
    //Se va a ejecutar cuando el componente se desmonta
    //cuando cambian las dependencias antes de ejecutar el efecto de nuevo
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
    
  }, [enabled])

  //[] => solo se ejecuta una vez cuando se monta en el componente
  //[enabled] => se ejecuta cuando cambia el enabled y cuando se monta el componente
  //undefined => se ejecuta cada vez que se renderiza el componente

  useEffect (()=> {
    document.body.classList.toggle('no-cursor', enabled)
    return () => {
      document.body.classList.remove('no-cursor')
    }
    
  }, [enabled])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}/>
      <button onClick={() =>setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} Seguir Puntero 
      </button>
    </>
  )
}

function App() {
  
  
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
