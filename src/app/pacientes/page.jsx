"use client";
import { useState, useEffect } from 'react';
import Paciente from '@/components/Paciente';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalNewPacient from '@/components/ModalNewPaciente';
import { nanoid } from 'nanoid';



function PagePacientes() {

    const [pacientes, setPacientes] = useState([]);
    const [isModalOpenNewPacient, setIsModalOpenNewPacient] = useState(false);


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
    }, []);


    const handleAgregarPaciente = () => {
        setIsModalOpenNewPacient(true)
    };

    const handleDelete = (paciente) => {

        try {
            const { pk_idPaciente } = paciente.response
            const arr = []
            // const filtrado = pacientes.filter( element =>  element.pk_idPaciente !== paciente.pk_idEspecialista );
            pacientes.filter(element => {
                if (element.pk_idPaciente !== pk_idPaciente) {
                    console.log('Salida de element-->', element)
                    arr.push(element)
                    setPacientes(arr)
                } else {
                    setPacientes([])
                }
            })
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
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

    const closeModal = () => {
        setIsModalOpenNewPacient(false);
    };



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
                                <Paciente
                                    paciente={element}
                                    key={nanoid()}
                                    onDelete={handleDelete}
                                    onUpdate={handleEditUpdate}
                                />
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

                />
            )}


        </>
    )
}

export default PagePacientes
