import { Formik, Form, Field } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import Alerta from './Alerta'
import Spinner from "../components/Spinner"

const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
        .required("El nombre del cliente es obligatorio")
        .max(20, "El nombre es muy largo")
        .min(3, "El nombre es muy corto"),
        empresa: Yup.string()
        .required("El nombre de la empresa es obligatorio"),
        email: Yup.string()
        .required("El e-mail es obligatorio")
        .email("E-mail no válido"),
        telefono: Yup.number()
        .typeError("El número no es válido")
        .integer("El número no es válido")
        .positive("El número no es válido"),
        notas: ""
    })

    const handleSubmit = async (valores) => {
        try {
            let respuesta
            if(cliente.id){
                //Editando Registro
                const url = `http://localhost:4000/clientes/${cliente.id}`

                respuesta = await fetch(url, {
                    method: "PUT",
                    body: JSON.stringify(valores),
                    headers: {
                        "Content-Type": "application/json"
                }
            })
            } else {
                // Nuevo Registro 
                const url = "http://localhost:4000/clientes"

                respuesta = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(valores),
                    headers: {
                        "Content-Type": "application/json"
                }
            })
            }
            await respuesta.json()
            navigate("/clientes")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        cargando ? <Spinner/> : (
            <div 
            className='bg-gray-200 mt-10 px-5 py-10 rounded-md 
            shadow-md md:w-3/4 mx-auto'>
                <h1 
                className='text-gray-600 font-bold text-xl 
                uppercase text-center'>{ cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                </h1>

                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? "",
                        empresa: cliente?.empresa ?? "",
                        email: cliente?.email ?? "",
                        telefono: cliente?.telefono ?? "",
                        notas: cliente?.notas ?? ""
                    }}

                    enableReinitialize={true}

                    onSubmit={ async (values, {resetForm})=>{
                        await handleSubmit(values)

                        resetForm()
                    }}
                    validationSchema={nuevoClienteSchema}
                >
                    {({errors, touched}) => {
                        return (
                    <Form
                        className='mt-10'
                    >
                        <div className='mb-4'>
                            <label htmlFor='nombre'
                                className='text-gray-800 font-bold'
                            >Nombre:
                            </label> 
                            <Field
                                id="nombre"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Nombre del Cliente"
                                name="nombre"
                            />
                            {errors.nombre && touched.nombre ? (<Alerta>{errors.nombre}</Alerta>) : null}
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='empresa'
                                className='text-gray-800 font-bold'
                            >Empresa:
                            </label> 
                            <Field
                                id="nombre"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Empresa del Cliente"
                                name="empresa"
                            />
                            {errors.empresa && touched.empresa ? (<Alerta>{errors.empresa}</Alerta>) : null}
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='email'
                                className='text-gray-800 font-bold'
                            >E-mail:
                            </label> 
                            <Field
                                id="email"
                                type="email"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="E-mail del Cliente"
                                name="email"
                            />
                            {errors.email && touched.email ? (<Alerta>{errors.email}</Alerta>) : null}

                        </div>
                        <div className='mb-4'>
                            <label htmlFor='telefono'
                                className='text-gray-800 font-bold'
                            >Teléfono:
                            </label> 
                            <Field
                                id="telefono"
                                type="tel"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Teléfono del Cliente"
                                name="telefono"
                            />
                            {errors.telefono && touched.telefono ? (<Alerta>{errors.telefono}</Alerta>) : null}

                        </div>
                        <div className='mb-4'>
                            <label htmlFor='notas'
                                className='text-gray-800 font-bold'
                            >Notas:
                            </label> 
                            <Field
                                as="textarea"
                                id="notas"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50 h-32"
                                placeholder="Notas del Cliente"
                                name="notas"
                            />
                        </div>

                        <input type="submit"
                        value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente" }
                        className='mt-5 w-full bg-blue-800 p-3 text-white uppercase 
                        text-center font-bold text-lg rounded-md'/>
                    </Form>
                    )}}
                </Formik>
            </div>
        )
  )
}

Formulario.defaultProps={
    cliente: {},
    cargando: false
}

export default Formulario