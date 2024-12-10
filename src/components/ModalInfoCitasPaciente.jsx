"use client";

function ModalInfoCitasPaciente({ onClose, isModalOpen , infoCitaPaciente }) {

    console.log('Salida de infoCitaPaciente-->', infoCitaPaciente)
    return (
        <dialog id="my_modal_2" className="modal" open={isModalOpen}>

            <div className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                <div className="flex-auto flex-col items-start info">
                    <h2 className="text-center font-bold tracking-wide text-lg md:text-xl mb-3 border-b border-stone-500 pb-1 uppercase">Información del paciente</h2>
                    <div className="grid grid-cols-1">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate sequi in rerum necessitatibus! Architecto culpa similique, accusamus tenetur iusto ducimus saepe laboriosam harum impedit dolorum voluptatum, nulla delectus provident recusandae?</p>
                        {/* <button  className="btn btn-sm btn-error hover:bg-red-900" onClick={onClose}>Cancelar</button> */}
                    </div>
                </div>
            </div>
        </dialog>
    )
}
export default ModalInfoCitasPaciente
