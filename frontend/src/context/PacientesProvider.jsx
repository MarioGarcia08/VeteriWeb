import { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import clienteAxios from '../../config/axios'
import useAuth from '../hooks/useAuth'

const PacientesContext = createContext()

export const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})
    const {auth} = useAuth()

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token){
                    return
                }
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios('/api/pacientes', config)
                setPacientes(data)

            } catch (error) {
                console.log(error)
            }
        }

        obtenerPacientes();
    }, [auth])

    const guardarPaciente = async(paciente) => {

        const token = localStorage.getItem('token')
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id){
            try {
                const {data} = await clienteAxios.put(`/api/pacientes/${paciente.id}`, paciente, config)
                const pacientesActualizados = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacientesActualizados)
            } catch (error) {
                console.log(error)
            }
        }
        else{
            try {
                const {data} = await clienteAxios.post('/api/pacientes', paciente, config)
                const pacienteAlmacenado = {...data};
                delete pacienteAlmacenado.createdAt;
                delete pacienteAlmacenado.updatedAt;
                delete pacienteAlmacenado.__v;
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }        
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async (id) => {
        const confirmar = confirm('¿Deseas eliminar este Paciente?')
        if(confirmar){
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                await clienteAxios.delete(`/api/pacientes/${id}`, config)
                
                const pacientesActualizados = pacientes.filter(pacienteState => pacienteState._id !== id)
                setPacientes(pacientesActualizados)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

PacientesProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default PacientesContext;