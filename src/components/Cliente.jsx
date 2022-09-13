import { useNavigate } from "react-router-dom"

const Cliente = ({cliente, handleEliminar}) => {

    const navigate = useNavigate()

    const {nombre, empresa, email, telefono, notas, id} = cliente

    return (
        <tr className='text-center border-b shadow-md rounded-xl hover:bg-gray-400'>
            <td className='p-3'>{nombre}</td>
            <td className='p-3'>
                <p><span className='text-gray-800 uppercase font-bold'>E-mail: </span>{email}</p>
                <p><span className='text-gray-800 uppercase font-bold'>Teléfono: </span>{telefono}</p>
            </td>
            <td className='p-3'>{empresa}</td>
            <td className='p-3'>
                <button 
                type='button'
                className='bg-blue-300 hover:bg-blue-800  hover:text-white block w-full p-2 uppercase font-bold text-xs rounded-3xl'
                onClick={() => navigate(`/clientes/${id}`)}
                > Ver </button>
                <button 
                type='button'
                className='mt-2 bg-yellow-400 hover:bg-yellow-500 hover:text-white block w-full p-2 uppercase font-bold text-xs rounded-3xl'
                onClick={() => navigate(`/clientes/editar/${id}`)}
                > Editar </button>
                <button 
                type='button'
                className='mt-2 bg-red-300 hover:bg-red-800  hover:text-white block w-full p-2 uppercase font-bold text-xs rounded-3xl'
                onClick={() => {
                    handleEliminar(id);
                }}
                > Eliminar </button>

            </td>
        </tr>
    )
}

export default Cliente