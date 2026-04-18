"use client";

function ModalInfoCitasPaciente({ onClose, isModalOpen, infoCitaPaciente }) {


    return (
        <dialog id="my_modal_2" className="modal" open={isModalOpen}>

            <div className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                <div className="flex-auto flex-col items-start info">
                    <h2 className="text-center font-bold tracking-wide text-lg md:text-xl mb-3 border-b border-stone-500 pb-1 uppercase">Información del paciente</h2>

                    <div className="grid grid-cols-1">
                        <h3 className="text-xl mb-3 border-b border-stone-500 pb-1 pt-3">Expediente</h3>
                        <p>Paciente {infoCitaPaciente?.nombre} {infoCitaPaciente?.apellido} nacio el {infoCitaPaciente?.fechaNacimiento}, {infoCitaPaciente?.region}, {infoCitaPaciente?.ciudad}, número de contacto {infoCitaPaciente?.telefono}</p>
                    </div>

                    {infoCitaPaciente?.cita.lenght > 0 ?
                        <div className="grid grid-cols-1">
                            <h3 className="text-xl mb-3 border-b border-stone-500 pb-1 pt-3">Citas agendadas</h3>
                            {
                                <ul>
                                    {
                                        infoCitaPaciente?.cita.map(element => {
                                            <li>{element}</li>
                                        })
                                    }

                                </ul>
                            }

                        </div>
                        :
                        <h3 className="text-xl mb-3 border-b border-stone-500 pb-1 pt-3">Sin citas agendadas</h3>
                    }
                </div>
            </div>
        </dialog>
    )
}
export default ModalInfoCitasPaciente
