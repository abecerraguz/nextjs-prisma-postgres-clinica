const handleRegistre = async (e) =>{
    const id = e.target.dataset.info
    await fetch(`/api/especialistas/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( res => {
        if(res.ok){
            document.getElementById('my_modal_2').close()
            window.location.reload()
        }else{
            console.log(res)
        }
    })
}

function ModalAlert( ) {
    return (
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
                <div className="flex-auto flex-col items-start info">
                    <h2 className="text-center font-bold tracking-wide text-lg md:text-xl mb-3 border-b border-stone-500 pb-1 uppercase">Desea eliminar el registro ?</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            id="deleteRegistro" 
                            className="btn btn-sm btn-success hover:bg-cyan-600"
                            onClick={handleRegistre}
                        >Eliminar
                        </button>
                        <button  className="btn btn-sm btn-error hover:bg-red-900" onClick={() => document.getElementById('my_modal_2').close()}>Cancelar</button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}
export default ModalAlert
