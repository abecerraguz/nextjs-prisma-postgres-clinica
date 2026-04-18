"use client";
import { useState } from 'react';


function ModalAlert({ especialista, onClose, onDelete, isModalOpen, registro, paciente }) {

    console.log('Salida de props-->', paciente )

    const [ id, setId ] = useState( especialista?.pk_idEspecialista || paciente?.pk_idPaciente );

    const handleDelete = () => {
        const idEspecialista = {
            ...especialista,
            id,
        };
        onDelete(idEspecialista);
    };

    return (
        <dialog id="my_modal_2" className="modal" open={isModalOpen}>
            <div className="modal-box">
                <div className="flex-auto flex-col items-start info">
                    <h2 className="text-center font-bold tracking-wide text-lg md:text-xl mb-3 border-b border-stone-500 pb-1 uppercase">Desea eliminar el registro ?</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            id="deleteRegistro" 
                            className="btn btn-sm btn-success hover:bg-cyan-600"
                            onClick={ handleDelete  }
                        >Eliminar
                        </button>
                        <button  className="btn btn-sm btn-error hover:bg-red-900" onClick={onClose}>Cancelar</button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}
export default ModalAlert
