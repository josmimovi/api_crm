import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner"


const verCliente = () => {

    const[cliente, setCliente] = useState({})
    const[cargando, setCargando] = useState(true)

    const {id} = useParams()
    
    useEffect(()=> {
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }

            setTimeout(()=>{
                setCargando(!cargando)
            },1000)
        }
        obtenerClienteAPI()
    }, [])

    return (
        cargando ? <Spinner/> : 

            Object.keys(cliente).length === 0 ?
            <p> No hay resultados </p> : 
         
            (
            <div> 
                <h1
                    className='font-black text-4xl text-indigo-900'>Cliente: {cliente.nombre}</h1>
                <p
                    className='mt-4'
                >Información del cliente: </p>
        
                <p className="text-xl text-gray-600 mt-4">
                    <span 
                        className='text-gray-600 uppercase font-bold'>E-mail: {""} 
                    </span>{cliente.email}
                </p>
                {cliente.telefono && (
                    <p className="text-xl text-gray-600 mt-4">
                        <span 
                            className='text-gray-600 uppercase font-bold'>Teléfono: {""} 
                        </span>{cliente.telefono}
                    </p>
                )}
                <p className="text-xl text-gray-600 mt-4">
                    <span 
                        className='text-gray-600 uppercase font-bold'>Empresa: {""} 
                    </span>{cliente.empresa}
                </p>
                {cliente.notas && (
                    <p className="text-xl text-gray-600 mt-4">
                        <span 
                            className='text-gray-600 uppercase font-bold'>Notas: {""} 
                        </span>{cliente.notas}
                    </p>
                )}
            </div>
        )
    )
}

export default verCliente