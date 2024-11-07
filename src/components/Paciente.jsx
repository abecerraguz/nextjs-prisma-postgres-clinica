"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react';
import ModalNewCita from '@/components/ModalNewCita';
import ModalAlertEliminarCita from '@/components/ModalAlertEliminarCita';
import { nanoid } from 'nanoid';
import ModalAlert from "@/components/ModalAlert";
import ModalEditPaciente from '@/components/ModalEditPaciente';
// import { formatearFecha } from '@/app/utilities/functions';





function Paciente({ paciente, onDelete, onUpdate }) {

    const [show, toggleShow] = useState(true);
    const [citas, setCitas] = useState([]);
    const [estado, setEstado] = useState(paciente.estado);
    const [isModalAlertEliminar, setisModalAlertEliminar] = useState(false);
    const [isModalEditar, setisModalEditar] = useState(false);
    const [isModalNewCita, setisModalNewCita] = useState(false);
    const [isModalDeleteCita, setIsModalDeleteCita] = useState(false);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [idCita, setIdCita] = useState(null)

    const { pk_idPaciente, nombre, apellido, sexo, fechaNacimiento, region, ciudad, telefono } = paciente
    const nuevaFecha = new Date(fechaNacimiento).toLocaleDateString();



    const handleAlertModalEliminarCita = (id) => {
        setIsModalDeleteCita(true)
        setIdCita(id)
    }

    const handleDeleteClick = (paciente) => {
        setPacienteSeleccionado(paciente);
        setisModalAlertEliminar(true);
    };

    const closeModal = () => {
        setisModalAlertEliminar(false)
        setisModalEditar(false)
        setisModalNewCita(false)
        setIsModalDeleteCita(false)
        setPacienteSeleccionado(null);
    };


    const handleDelete = async (paciente) => {

        try {
            const id = paciente.id
            const response = await fetch(`/api/pacientes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                response.json()
                    .then(response => {

                        const dataPacientes = {
                            response
                        };

                        onDelete(dataPacientes)

                    })
                closeModal();
            } else {
                console.error('Error al eliminar el registro');
            }
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    };
    const getCitas = async () => {
        try {
            const response = await fetch(`/api/citas`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json()
                const arrCitas = []
                const opciones = {
                    weekday: 'long',  // Día de la semana completo (Ej: "Lunes")
                    year: 'numeric',  // Año (Ej: "2024")
                    month: 'long',    // Mes completo (Ej: "Septiembre")
                    day: 'numeric'    // Día del mes (Ej: "31")
                };
                data.forEach(element => {
                    const { pk_idCita, fk_idPaciente, fecha, hora, agendar_citas: [{ consultorio, especialista: { nombre, apellido, especialidad } }] } = element
                    const fechaActual = new Date(fecha);
                    const fechaFormateada = fechaActual.toLocaleDateString('es-ES', opciones);
                    arrCitas.push({
                        pk_idCita,
                        fk_idPaciente,
                        nombre,
                        apellido,
                        especialidad,
                        fecha: fechaFormateada,
                        hora,
                        consultorio
                    })
                });
                setCitas(arrCitas)
            } else {
                console.error('Error al obtener registro');
            }

        } catch (error) {
            console.error('Error al obtener el registro:', error);
        }
    }

    useEffect(() => {
        getCitas()
    }, []);

    const handleAddCita = () => {
        setisModalNewCita(true)
    };


    // Función para eliminar un registro
    const handleEliminarCita = async (id) => {
        try {
            const response = await fetch(`/api/citas/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await getCitas();
            } else {
                console.error('Error al eliminar el registro');
            }
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    };


    const handleEstadoChange = async (e) => {
        const nuevoEstado = e.target.checked;
        setEstado(nuevoEstado); // Actualiza el estado local

        // Enviar la actualización al backend
        await fetch(`/api/pacientes/${paciente.pk_idPaciente}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ estado: nuevoEstado }),
        });
    };

    const handleEditClick = (paciente) => {
        setPacienteSeleccionado(paciente);
        setisModalEditar(true);
    };


    const handleSave = (pacienteEditado) => {
        try {
            const { pk_idPaciente, nombre, apellido, sexo, fechaNacimiento, region, ciudad, telefono, estado } = pacienteEditado
            const dataUpdate = {
                pk_idPaciente, nombre, apellido, sexo, fechaNacimiento, region, ciudad, telefono, estado
            }
            onUpdate(dataUpdate)
            closeModal();
        } catch (error) {
            console.error('Error al editar el registro:', error);
        }
    };

    return (
        <>
            <tr>
                <th scope="row" className="collapseAction flex items-center justify-center">
                    <i className={show ? 'minus' : 'more'} onClick={() => toggleShow(!show)}></i>
                </th>
                <td>{nombre}</td>
                <td>{apellido}</td>
                <td>{sexo}</td>
                <td>{nuevaFecha}</td>
                <td>{region}</td>
                <td>{ciudad}</td>
                <td>{telefono}</td>
                {/* <td>{estado == true ? 'On': 'Off'}</td> */}
                <td>
                    <div className="flex gap-2">
                        <input type="checkbox" className="toggle toggle-lg"
                            checked={estado}
                            onChange={handleEstadoChange}
                        />
                        <button
                            className="btn btn-sm btn-success hover:bg-cyan-600 text-slate-900 hover:text-white sm:w-1/4 text-xs md:text-sm tooltip flex"
                            onClick={() => handleEditClick(paciente)}
                            data-info={pk_idPaciente}
                            data-tip="Editar"
                        >
                            <FontAwesomeIcon
                                icon={faPenToSquare}
                                className="fa-regular fa-pen-to-square"
                                style={{ fontSize: 16 }}
                            />
                        </button>
                        <button
                            className="btn btn-sm btn-error hover:bg-red-900 text-black hover:text-white sm:w-1/4 text-xs md:text-sm tooltip flex"
                            onClick={() => handleDeleteClick(paciente)}
                            data-info={pk_idPaciente}
                            data-tip="Eliminar Paciente"
                        >
                            <FontAwesomeIcon
                                icon={faCircleXmark}
                                className="fa-regular fa-circle-xmark"
                                style={{ color: 'white', fontSize: 16 }}
                            />
                        </button>
                    </div>
                </td>

            </tr>

            <tr className={show ? 'bg-gradient-to-r from-gray-700 via-gray-900 to-slate-900 hidden' : 'bg-gradient-to-r from-gray-700 via-gray-900 to-slate-900'}>
                <td colSpan="10">
                    <div className={`contentAction ${pk_idPaciente} flex gap-2`}>
                        {/* <button
                            className="btn btn-sm bg-gradient-to-r from-green-500 to-green-700 font-normal tooltip flex"
                            onClick={handleEditPaciente}
                            data-info={pk_idPaciente}
                            data-tip="Eliminar"
                        >
                            <FontAwesomeIcon
                                icon={faCircleXmark}
                                className="fa-regular fa-circle-xmark"
                                style={{ color: 'white', fontSize: 16 }}
                            />
                            Editar especialista
                        </button> */}
                        {/* <button
                            className="btn btn-sm bg-gradient-to-r from-green-500 to-green-700 font-normal tooltip flex"
                            onClick={handleEditExpedient}
                            data-info={pk_idPaciente}
                            data-tip="Eliminar"
                        >
                            <FontAwesomeIcon
                                icon={faCircleXmark}
                                className="fa-regular fa-circle-xmark"
                                style={{ color: 'white', fontSize: 16 }}
                            />
                            Editar expediente paciente
                        </button> */}
                        <button
                            className="btn btn-sm bg-gradient-to-r from-green-500 to-green-700 font-normal tooltip flex"
                            onClick={handleAddCita}
                            data-tip="Agendar cita"
                        >
                            <FontAwesomeIcon
                                icon={faCircleXmark}
                                className="fa-regular fa-circle-xmark"
                                style={{ color: 'white', fontSize: 16 }}
                            />
                            Agendar cita
                        </button>
                    </div>
                    <div className={`contentInfoTableAgendarCita ${pk_idPaciente}`} infotable={pk_idPaciente}>
                        <div className="block py-2 px-4 rounded-t-lg bg-gradient-to-r from-slate-900 to-slate-800 uppercase mt-3">Citas agendadas</div>
                        <table className="table text-base">
                            <thead className="text-base text-white uppercase font-normal md:text-base bg-slate-800">
                                <tr>
                                    <th>#</th>
                                    <th>Doctor</th>
                                    <th>Especialidad</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Consultorio</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody className="infoTableCitas">
                                {citas.map((element, index) => (
                                    <>  {element.fk_idPaciente == pk_idPaciente ?
                                        <>
                                            <tr key={nanoid()}>
                                                <td>{index + 1}</td>
                                                <td>{element.nombre} {element.apellido}</td>
                                                <td>{element.especialidad}</td>
                                                <td>{element.fecha}</td>
                                                <td>{element.hora}</td>
                                                <td>{element.consultorio}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-error hover:bg-red-900 text-black hover:text-white sm:w-full text-xs md:text-sm tooltip flex"
                                                        onClick={() => handleAlertModalEliminarCita(element.pk_idCita)}
                                                        // data-info={element.pk_idCita}
                                                        data-tip="Eliminarrrrr"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faCircleXmark}
                                                            className="fa-regular fa-circle-xmark"
                                                            style={{ color: 'white', fontSize: 16 }}
                                                        />
                                                    </button>
                                                </td>
                                            </tr>


                                        </>
                                        :
                                        null
                                    }

                                    </>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </td>
            </tr>


            {isModalDeleteCita && (
                <ModalAlertEliminarCita
                    isModalOpen={isModalDeleteCita}
                    onClose={closeModal}
                    onEliminar={handleEliminarCita}
                    id={idCita}
                />
            )}

            {isModalNewCita && (
                <ModalNewCita
                    isModalOpen={isModalNewCita}
                    onClose={closeModal}
                    onAgregar={getCitas}
                    paciente={paciente}
                />
            )}

            {isModalAlertEliminar && (
                <ModalAlert
                    onClose={closeModal}
                    onDelete={handleDelete}
                    isModalOpen={isModalAlertEliminar}
                    paciente={pacienteSeleccionado}
                />
            )}
            {isModalEditar && (
                <ModalEditPaciente
                    onClose={closeModal}
                    isModalOpen={isModalEditar}
                    paciente={pacienteSeleccionado}
                    onSave={handleSave}
                />
            )}
        </>
    )
}

export default Paciente
