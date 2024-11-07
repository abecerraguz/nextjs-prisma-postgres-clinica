"use client";

function ModalAlert({ isModalOpen, onClose, id, onEliminar }) {
    // console.log('SALIDA PROPS-->', paciente)
    // const idCita = id
    const handleEliminar = (idValue) => {
        try {
          onEliminar(idValue);
          onClose()
        //   document.getElementById('eliminarCita').close();
        } catch (error) {
          console.error(error.message);
        }
    };

    return (
        <dialog id="eliminarCita" className="modal" open={isModalOpen}>
            <div className="modal-box">
                <div className="flex-auto flex-col items-start info">
                    <h2 className="text-center font-bold tracking-wide text-lg md:text-xl mb-3 border-b border-stone-500 pb-1 uppercase">Desea eliminar el registrooooooo ?</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            id="deleteRegistro" 
                            className="btn btn-sm btn-success hover:bg-cyan-600"
                            onClick={() => handleEliminar(id)}
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
