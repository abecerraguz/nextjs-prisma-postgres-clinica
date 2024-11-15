
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

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

export default Paciente