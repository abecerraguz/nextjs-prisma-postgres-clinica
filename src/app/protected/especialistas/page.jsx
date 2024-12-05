"use client";

import { useState, useEffect } from 'react';
import ModalAlert from '@/components/ModalAlert';
import ModalNewEspecialist from '@/components/ModalNewEspecialist';
import ModalEditEspecialist from '@/components/ModalEditEspecialist';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPenToSquare, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { isTokenExpired } from '@/utils/auth';

function PageEspecialistas() {


    const [especialistas, setEspecialistas] = useState([]);
    const [especialistaSeleccionado, setEspecialistaSeleccionado] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenAlert, setIsModalOpenAlert] = useState(false);
    const [isModalOpenNewEspecilsit, setModalOpenNewEspecilsit] = useState(false);
    const router = useRouter();



    useEffect(() => {


    

        const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];
    
        if (isTokenExpired(token) === null ) {
            router.push('/login'); // Redirige al login si el token ha expirado
        }else{
            const fetchEspecialistas = async () => {
                const response = await fetch('/api/especialistas');
                const data = await response.json();
                setEspecialistas(data);
            };
            fetchEspecialistas();
        }

    }, [router]);

    const handleEditClick = (especialista) => {
        setEspecialistaSeleccionado(especialista);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (especialista) => {
        setEspecialistaSeleccionado(especialista);
        setIsModalOpenAlert(true);
    };

    const handleAgregarEspecialista = () => {
        setModalOpenNewEspecilsit(true)
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsModalOpenAlert(false)
        setModalOpenNewEspecilsit(false)
        setEspecialistaSeleccionado(null);
    };

    const handleSave = async (especialistaEditado) => {

        try {

            const updatedEspecialistas = especialistas.map(esp => esp.pk_idEspecialista === especialistaEditado.pk_idEspecialista ? especialistaEditado : esp);
            const id = especialistaEditado.pk_idEspecialista

            const response = await fetch(`/api/especialistas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(especialistaEditado),
            });

            if (response.ok) {
                response.json()
                    .then(response => {
                        setEspecialistas(updatedEspecialistas);
                        console.log(response)
                    })
                closeModal();
            } else {
                console.error('Error al eliminar el registro');
            }
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    };

    const handleDelete = async (especialistaEditado) => {
        try {
            const updatedEspecialistas = especialistas.filter(esp => esp.pk_idEspecialista !== especialistaEditado.pk_idEspecialista);
            const id = especialistaEditado.pk_idEspecialista

            const response = await fetch(`/api/especialistas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                response.json()
                    .then(response => {
                        setEspecialistas(updatedEspecialistas);
                    })
                closeModal();
            } else {
                console.error('Error al eliminar el registro');
            }
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    };

    const handleUpdate = async (especialistaUpdate) => {

        try {
            const response = await fetch(`/api/especialistas/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(especialistaUpdate.especialista),
            });

            if (response.ok) {
                response.json()
                    .then(response => {
                        const dataEspecialista = [
                            ...especialistas,
                            response
                        ];
                        setEspecialistas(dataEspecialista);
                    })
                closeModal();
            } else {
                console.error('Error al eliminar el registro');
            }
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    };

    return (
        <>
            <section className='container m-auto md:w-full px-5 sm:px-5 py-20'>

                <div className="flex justify-between items-center mb-5 py-3 border-b border-white-500">
                    <h1 className='text-xl font-normal uppercase'>Especialistas</h1>
                    <button
                        className="btn btn-sm btn-success hover:text-white hover:bg-cyan-600 font-normal"
                        onClick={handleAgregarEspecialista}
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="fa-solid fa-plus"
                        />
                        Agregar especialista
                    </button>
                </div>

                <div className="w-full rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 p-3 overflow-x-auto shadow-3xl relative z-0" id='contentTable'>
                    <table className="table text-base">
                        {/* head */}
                        <thead className='uppercase font-extrabold text-sm md:text-base bg-slate-800'>
                            <tr>
                                {/* <th>ID</th> */}
                                <th className='text-white font-extrabold tracking-widest'>NOMBRE</th>
                                <th className='text-white font-extrabold tracking-widest'>APELLIDO</th>
                                <th className='text-white font-extrabold tracking-widest'>SEXO</th>
                                <th className='text-white font-extrabold tracking-widest'>NACIMIENTO</th>
                                <th className='text-white font-extrabold tracking-widest'>ESPECIALIDAD</th>
                                <th className='text-white font-extrabold tracking-widest'>ACCION</th>
                            </tr>
                        </thead>
                        <tbody>

                            {especialistas.map(especialista => (
                            
                                    <tr key={nanoid()}>
                                        <td>{especialista.nombre}</td>
                                        <td>{especialista.apellido}</td>
                                        <td>{especialista.sexo}</td>
                                        <td>{new Date(especialista.fechaNacimiento).toLocaleDateString()}</td>
                                        <td>{especialista.especialidad}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button
                                                    className="btn btn-sm btn-success hover:bg-cyan-600 text-slate-900 hover:text-white sm:w-1/2 text-xs md:text-sm tooltip flex"
                                                    onClick={() => handleEditClick(especialista)}
                                                    data-tip="Editar"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faPenToSquare}
                                                        className="fa-regular fa-pen-to-square"
                                                        style={{ fontSize: 16 }}
                                                    />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-error hover:bg-red-900 text-black hover:text-white sm:w-1/2 text-xs md:text-sm tooltip flex"
                                                    onClick={() => handleDeleteClick(especialista)}
                                                    data-tip="Eliminarrrrr"
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
                                
                            ))}
                        </tbody>
                    </table>
                </div>

            </section>

            {isModalOpen && (
                <ModalEditEspecialist
                    especialista={especialistaSeleccionado}
                    onClose={closeModal}
                    onSave={handleSave}
                    isModalOpen={isModalOpen}
                />
            )}

            {isModalOpenAlert && (
                <ModalAlert
                    onClose={closeModal}
                    onDelete={handleDelete}
                    isModalOpen={isModalOpenAlert}
                    especialista={especialistaSeleccionado}
                />
            )}

            {isModalOpenNewEspecilsit && (

                <ModalNewEspecialist
                    onClose={closeModal}
                    isModalOpen={isModalOpenNewEspecilsit}
                    onUpdate={handleUpdate}
                />

            )}


        </>
    )
}

export default PageEspecialistas
