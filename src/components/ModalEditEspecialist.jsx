"use client"
import { useRouter } from "next/navigation";





function ModalEditEspecialist() {

    const router = useRouter()
   
    const handleSubmit = (e) => {
        e.preventDefault()
        const nombre = e.target.nombre.value,
        apellido = e.target.apellido.value,
        sexo = e.target.sexo.value,
        fechaNacimiento = e.target.fechaNacimiento.value,
        especialidad = e.target.especialidad.value
        const buttonEnviar = document.querySelector('.buttonEnviarEdit')
        const pk_idEspecialista = buttonEnviar.getAttribute('id')
     
        const datosParaEnviar = {
            nombre,
            apellido,
            sexo,
            fechaNacimiento : new Date(fechaNacimiento),
            especialidad
        }

        fetch(`/api/especialistas/${pk_idEspecialista}`, {
            method: 'PUT',
            body: JSON.stringify(datosParaEnviar),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(response.ok) {
                const modal = document.getElementById('modalEditEspecialist')
                modal.close()
                // router.refresh()
                window.location.reload()
            }
        })
      
    }

    const handleCloseModal = (e) =>{
        e.preventDefault()
        const modal = document.getElementById('modalEditEspecialist')
        modal.close()
    }

    return (
        <dialog  id="modalEditEspecialist" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg border-b border-white-500 uppercase tracking-wider mb-5"></h3>
                    <form className="w-full" method="dialog" id="formModalEditEspecialist" onSubmit={handleSubmit}>
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleCloseModal}>✕</button>
                        <input type="text" placeholder="Nombre" className="input input-bordered input-info w-full mb-4" id="nombre" />
                        <input type="text" placeholder="Apellido" className="input input-bordered input-info w-full mb-4" id="apellido" />
                        <select className="select input-bordered input-info w-full mb-4" id="sexo">
                            <option disabled selected>Seleccione Sexo</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select>
                        <input type="date" placeholder="Fecha de Nacimiento" id="fechaNacimiento" />
                        <input type="text" placeholder="Especialidad" className="input input-bordered input-info w-full mb-5" id="especialidad"/>
                        <button className="btn btn-sm btn-success hover:bg-cyan-600 buttonEnviarEdit w-full">Actualizar</button>
                    </form>
            </div>
        </dialog>
    )
}

export default ModalEditEspecialist
