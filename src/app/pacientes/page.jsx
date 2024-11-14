"use client";
import { useState, useEffect } from 'react';
// import Paciente from '@/components/Paciente';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import ModalNewPacient from '@/components/ModalNewPaciente';
import { nanoid } from 'nanoid';
import ModalAlert from "@/components/ModalAlert";
import ModalEditPaciente from '@/components/ModalEditPaciente';
import ModalNewCita from '@/components/ModalNewCita';



function PagePacientes() {

    const [pacientes, setPacientes] = useState([]);
    const [isModalOpenNewPacient, setIsModalOpenNewPacient] = useState(false);
    const [isModalAlertEliminar, setisModalAlertEliminar] = useState(false);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [isModalEditar, setisModalEditar] = useState(false);
    const [estado, setEstado] = useState(null);
    const [expandido, setExpandido] = useState({});
    const [isModalNewCita, setisModalNewCita] = useState(false);
    const [citas, setCitas] = useState([]);

    useEffect(() => {

        const getPacientes = async () => {
            try {
                const response = await fetch(`/api/pacientes`, {
                    method: 'GET',
                });

                if (response.ok) {
                    const data = await response.json()
                    setPacientes(data)
                } else {
                    console.error('Error al obtener registro');
                }

            } catch (error) {
                console.error('Error al obtener el registro:', error);
            }
        }
        getPacientes()
        getCitas()
        
    }, []);


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

    const handleAgregarPaciente = () => {
        setIsModalOpenNewPacient(true)
    };



    const handleEditUpdate = async (pacienteUpdate) => {
        try {
            const response = await fetch(`/api/pacientes/${pacienteUpdate.pk_idPaciente}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pacienteUpdate),
            });

            if (response.ok) {

                const filtro = pacientes.filter(element => element.pk_idPaciente !== pacienteUpdate.pk_idPaciente)

                const dataPacientes = [
                    ...filtro,
                    pacienteUpdate
                ];

                setPacientes(dataPacientes);
                closeModal();

            } else {
                console.error('Error al eliminar el registro');
            }


        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }

    };

    const handleUpdate = async (pacienteUpdate) => {

        try {
            const response = await fetch(`/api/pacientes/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pacienteUpdate.paciente),
            });

            if (response.ok) {
                response.json()
                    .then(response => {
                        console.log('Salida de response en el page-->', response)
                        const dataPaciente = [
                            ...pacientes,
                            response
                        ];
                        setPacientes(dataPaciente);
                    })
                closeModal();
            } else {
                console.error('Error al eliminar el registro');
            }
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    };

    const handleUpdateExpediente = async (expedienteUpdate) => {
        console.log('expedienteUpdate en page-->', expedienteUpdate)
        console.log('expedienteUpdate.expediente en page-->', expedienteUpdate.expediente)
        try {
            await fetch(`/api/expedientes/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expedienteUpdate.expediente),
            })
                .then(response => {
                    if (response.ok) {
                        closeModal();
                    } else {
                        console.error('Error al crear expediente');
                    }
                })

        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpenNewPacient(false);
        setisModalAlertEliminar(false);
        setisModalEditar(false)
        // setPacienteSeleccionado(null);
    };

    const handleDeleteClick = (paciente) => {
        setPacienteSeleccionado(paciente);
        setisModalAlertEliminar(true);
        setPacienteSeleccionado(null);
    };

    const handleEstadoChange = async (e) => {
        const nuevoEstado = e.target.checked;
        const id = e.target.id
        setEstado(nuevoEstado);
        // // Enviar la actualización al backend
        await fetch(`/api/pacientes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ estado: nuevoEstado }),
        });
    };

    // Función para alternar la visibilidad de la fila específica
    const toggleExpandir = (id) => {
        setExpandido((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Eliminar Paciente por ID
    const handleDelete = async (dataId) => {

        try {

            const { id } = dataId
            console.log('ID-->', id)
            await fetch(`/api/pacientes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    if (response.ok) {
                        response.json()
                            .then(respuesta => {
                                console.log('Salida de repuesta --->', respuesta)
                                const filtro = pacientes.filter(element => element.pk_idPaciente !== respuesta.pk_idPaciente)
                                setPacientes(filtro);
                                closeModal();
                            })
                    }
                })

        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    };

    // Consultar paciente pot ID
    const getPacienteID = async (id) => {
        try {
            const response = await fetch(`/api/pacientes/${id}`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json()
                console.log('Data-->', data)
                setPacienteSeleccionado(data)
                setisModalAlertEliminar(true)

            } else {
                console.error('Error al obtener registro');
            }

        } catch (error) {
            console.error('Error al obtener el registro:', error);
        }
    }

    // Abre la modal de editar paciente
    const handleEditClick = (paciente) => {
        setisModalEditar(true);
        setPacienteSeleccionado(paciente);

    };

    const handleSave = (pacienteEditado) => {
        try {
            const { pk_idPaciente, nombre, apellido, sexo, fechaNacimiento, region, ciudad, telefono, estado } = pacienteEditado
            const dataUpdate = {
                pk_idPaciente, nombre, apellido, sexo, fechaNacimiento, region, ciudad, telefono, estado
            }
            handleEditUpdate(dataUpdate)
            closeModal();
        } catch (error) {
            console.error('Error al editar el registro:', error);
        }
    };

    const handleAddCita = () => {
        setisModalNewCita(true)
    };


    const Paciente = ({ element }) => {
        return (
            <>
                <tr>
                    <th scope="row" className="collapseAction flex items-center justify-center">
                        <i
                            className={expandido[element.pk_idPaciente] ? 'minus' : 'more'}
                            onClick={() => toggleExpandir(element.pk_idPaciente)}
                        ></i>
                    </th>
                    <td>{element.nombre}</td>
                    <td>{element.apellido}</td>
                    <td>{element.sexo}</td>
                    <td>{new Date(element.fechaNacimiento).toLocaleDateString()}</td>
                    <td>{element.region}</td>
                    <td>{element.ciudad}</td>
                    <td>{element.telefono}</td>
                    <td>
                        <div className="flex gap-2">
                            <input type="checkbox" className="toggle toggle-lg"
                                checked={estado}
                                onChange={() => handleEstadoChange}
                                id={element.pk_idPaciente}
                            />
                            <button
                                className="btn btn-sm btn-success hover:bg-cyan-600 text-slate-900 hover:text-white sm:w-1/4 text-xs md:text-sm tooltip flex"
                                onClick={() => handleEditClick(element)}
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
                                onClick={() => getPacienteID(element.pk_idPaciente)}
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

                <tr className={expandido[element.pk_idPaciente] ? 'bg-gradient-to-r from-gray-700 via-gray-900 to-slate-900' : 'bg-gradient-to-r from-gray-700 via-gray-900 to-slate-900 hidden'}>
                    <td colSpan="10">
                        <div className={`contentAction ${element.pk_idPaciente} flex gap-2`}>
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
                        <div className={`contentInfoTableAgendarCita ${element.pk_idPaciente}`} infotable={element.pk_idPaciente}>
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
            </>
        )
    }

    return (
        <>
            <section className='container m-auto md:w-full px-5 sm:px-5 py-20'>

                <div className="flex justify-between items-center mb-5 py-3 border-b border-white-500">
                    <h1 className='text-xl font-normal uppercase'>Pacientes</h1>
                    <button
                        className="btn btn-sm btn-success hover:text-white hover:bg-cyan-600 font-normal" onClick={handleAgregarPaciente}
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="fa-solid fa-plus"
                        />
                        Agregar paciente
                    </button>
                </div>

                <div className="w-full rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 p-3 overflow-x-auto shadow-3xl relative z-0" id='contentTable'>
                    <table className="table text-base">
                        {/* head */}
                        <thead className='uppercase font-extrabold text-sm md:text-base bg-slate-800'>
                            <tr>
                                <th className='text-white font-extrabold text-center'>#</th>
                                <th className='text-white font-extrabold tracking-widest'>NOMBRE</th>
                                <th className='text-white font-extrabold tracking-widest'>APELLIDO</th>
                                <th className='text-white font-extrabold tracking-widest'>SEXO</th>
                                <th className='text-white font-extrabold tracking-widest'>NACIMIENTO</th>
                                <th className='text-white font-extrabold tracking-widest'>REGION</th>
                                <th className='text-white font-extrabold tracking-widest'>CIUDAD</th>
                                <th className='text-white font-extrabold tracking-widest'>CELULAR</th>
                                <th className='text-white font-extrabold tracking-widest'>ACCION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pacientes.map(element => (
                                <Paciente element={element} key={nanoid()} />
                            ))}
                        </tbody>
                    </table>
                </div>



            </section>

            {isModalOpenNewPacient && (
                <ModalNewPacient
                    onClose={closeModal}
                    isModalOpen={isModalOpenNewPacient}
                    onUpdate={handleUpdate}
                    onUpdateExpediente={handleUpdateExpediente}

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

            {isModalNewCita && (
                <ModalNewCita
                    isModalOpen={isModalNewCita}
                    onClose={closeModal}
                    onAgregar={getCitas}
                    paciente={paciente}
                />
            )}

        </>
    )
}

export default PagePacientes
